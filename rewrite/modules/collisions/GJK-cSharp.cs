/// @author orlin.georgiev
///     https://mollyrocket.com/forums/viewtopic.php?t=797

using System; 
using System.Collections.Generic; 
using Microsoft.Xna.Framework; 

namespace Orlin 
{ 
    /// Contains extension methods for the Vector3 class to save us some typing, e.g. instead of Vector3.Dot(v1, v2) just write v1.Dot(v2) 
    public static class Vector3Extensions 
    { 
        public static float Dot(this Vector3 op1, Vector3 op2) 
        { 
            return Vector3.Dot(op1, op2); 
        } 

        public static Vector3 Cross(this Vector3 op1, Vector3 op2) 
        { 
            return Vector3.Cross(op1, op2); 
        } 
    } 

    /// Implements the Gilbert-Johnson-Keerthi algorithm for collision detection in 3D, as described in the video lecture at http://mollyrocket.com/849 
    /// See also http://www.cse.ttu.edu.tw/~jmchen/compg/fall04/students-presentation/GJK.pdf 
    static class GilbertJohnsonKeerthi 
    { 
        //to prevent infinite loops - if an intersection is not found in 20 rounds, consider there is no intersection 
        private const int MaxIterations = 20; 

        /// Given the vertices (in any order) of two convex 3D bodies, calculates whether they intersect 
        public static bool BodiesIntersect(IList<Vector3> shape1, IList<Vector3> shape2) 
        { 
            //for initial point, just take the difference between any two vertices (in this case - the first ones) 
            Vector3 initialPoint = shape1[0] - shape2[0]; 
            Vector3 S = MaxPointInMinkDiffAlongDir(shape1, shape2, initialPoint); 
            Vector3 D = -S; 
            List<Vector3> simplex = new List<Vector3>(); 
            simplex.Add(S); 

            for (int i = 0; i < MaxIterations; i++) 
            { 
                Vector3 A = MaxPointInMinkDiffAlongDir(shape1, shape2, D); 
                if (Vector3.Dot(A, D) < 0) 
                { 
                    return false; 
                } 

                simplex.Add(A); 

                if (UpdateSimplexAndDirection(simplex, ref D)) 
                { 
                    return true; 
                } 
            } 

            return false; 
        } 


        /// Updates the current simplex and the direction in which to look for the origin. Called DoSimplex in the video lecture. 
        private static bool UpdateSimplexAndDirection(List<Vector3> simplex, ref Vector3 direction) 
        { 
            //if the simplex is a line 
            if (simplex.Count == 2) 
            { 
                //A is the point added last to the simplex 
                Vector3 A = simplex[1]; 
                Vector3 B = simplex[0]; 
                Vector3 AB = B - A; 
                Vector3 AO = -A; 

                if (AB.Dot(AO) > 0) 
                { 
                    direction = AB.Cross(AO).Cross(AB); 
                } 
                else 
                { 
                    direction = AO; 
                } 
            } 
            //if the simplex is a triangle 
            else if (simplex.Count == 3) 
            { 
                //A is the point added last to the simplex 
                Vector3 A = simplex[2]; 
                Vector3 B = simplex[1]; 
                Vector3 C = simplex[0]; 
                Vector3 AO = -A; 

                Vector3 AB = B - A; 
                Vector3 AC = C - A; 
                Vector3 ABC = AB.Cross(AC); 

                if (ABC.Cross(AC).Dot(AO) > 0) 
                { 
                    if (AC.Dot(AO) > 0) 
                    { 
                        simplex.Clear(); 
                        simplex.Add(C); 
                        simplex.Add(A); 
                        direction = AC.Cross(AO).Cross(AC); 
                    } 
                    else 
                        if (AB.Dot(AO) > 0) 
                        { 
                            simplex.Clear(); 
                            simplex.Add(B); 
                            simplex.Add(A); 
                            direction = AB.Cross(AO).Cross(AB); 
                        } 
                        else 
                        { 
                            simplex.Clear(); 
                            simplex.Add(A); 
                            direction = AO; 
                        } 
                } 
                else 
                { 
                    if (AB.Cross(ABC).Dot(AO) > 0) 
                    { 
                        if (AB.Dot(AO) > 0) 
                        { 
                            simplex.Clear(); 
                            simplex.Add(B); 
                            simplex.Add(A); 
                            direction = AB.Cross(AO).Cross(AB); 
                        } 
                        else 
                        { 
                            simplex.Clear(); 
                            simplex.Add(A); 
                            direction = AO; 
                        } 
                    } 
                    else 
                    { 
                        if (ABC.Dot(AO) > 0) 
                        { 
                            //the simplex stays A, B, C 
                            direction = ABC; 
                        } 
                        else 
                        { 
                            simplex.Clear(); 
                            simplex.Add(B); 
                            simplex.Add(C); 
                            simplex.Add(A); 

                            direction = -ABC; 
                        } 
                    } 
                } 
            } 
            //if the simplex is a tetrahedron 
            else //if (simplex.Count == 4) 
            { 
                //A is the point added last to the simplex 
                Vector3 A = simplex[3]; 
                Vector3 B = simplex[2]; 
                Vector3 C = simplex[1]; 
                Vector3 D = simplex[0]; 

                Vector3 AO = -A; 
                Vector3 AB = B - A; 
                Vector3 AC = C - A; 
                Vector3 AD = D - A; 
                Vector3 ABC = AB.Cross(AC); 
                Vector3 ACD = AC.Cross(AD); 
                Vector3 ADB = AD.Cross(AB); 

                //the side (positive or negative) of B, C and D relative to the planes of ACD, ADB and ABC respectively
                int BsideOnACD = Math.Sign(ACD.Dot(AB)); 
                int CsideOnADB = Math.Sign(ADB.Dot(AC)); 
                int DsideOnABC = Math.Sign(ABC.Dot(AD)); 

                //whether the origin is on the same side of ACD/ADB/ABC as B, C and D respectively 
                bool ABsameAsOrigin = Math.Sign(ACD.Dot(AO)) == BsideOnACD; 
                bool ACsameAsOrigin = Math.Sign(ADB.Dot(AO)) == CsideOnADB; 
                bool ADsameAsOrigin = Math.Sign(ABC.Dot(AO)) == DsideOnABC; 

                //if the origin is on the same side as all B, C and D, the origin is inside the tetrahedron and thus there is a collision 
                if (ABsameAsOrigin && ACsameAsOrigin && ADsameAsOrigin) 
                { 
                    return true; 
                } 
                    //if the origin is not on the side of B relative to ACD 
                else if (!ABsameAsOrigin) 
                { 
                    //B is farthest from the origin among all of the tetrahedron's points, so remove it from the list and go on with the triangle case 
                    simplex.Remove(B); 
                    //the new direction is on the other side of ACD, relative to B 
                    direction = ACD * -BsideOnACD;                    
                } 
                //if the origin is not on the side of C relative to ADB 
                else if (!ACsameAsOrigin) 
                { 
                    //C is farthest from the origin among all of the tetrahedron's points, so remove it from the list and go on with the triangle case 
                    simplex.Remove(C); 
                    //the new direction is on the other side of ADB, relative to C 
                    direction = ADB * -CsideOnADB; 
                } 
                //if the origin is not on the side of D relative to ABC 
                else //if (!ADsameAsOrigin) 
                { 
                    //D is farthest from the origin among all of the tetrahedron's points, so remove it from the list and go on with the triangle case 
                    simplex.Remove(D); 
                    //the new direction is on the other side of ABC, relative to D 
                    direction = ABC * -DsideOnABC; 
                } 

                //go on with the triangle case 
                //TODO: maybe we should restrict the depth of the recursion, just like we restricted the number of iterations in BodiesIntersect? 
                return UpdateSimplexAndDirection(simplex, ref direction); 
                
            } 

            //no intersection found on this iteration 
            return false; 
        } 

        /// Finds the farthest point along a given direction of the Minkowski difference of two convex polyhedra. 
        /// Called Support in the video lecture: max(D.Ai) - max(-D.Bj) 
        private static Vector3 MaxPointInMinkDiffAlongDir(IList<Vector3> shape1, IList<Vector3> shape2, Vector3 direction) 
        { 
            return MaxPointAlongDirection(shape1, direction) - MaxPointAlongDirection(shape2, Vector3.Negate(direction)); 
        } 

        /// Finds the farthest point along a given direction of a convex polyhedron 
        private static Vector3 MaxPointAlongDirection(IList<Vector3> shape, Vector3 direction) 
        { 
            Vector3 max = shape[0]; 
            foreach (Vector3 point in shape) 
            { 
                if (max.Dot(direction) < point.Dot(direction)) 
                { 
                    max = point; 
                } 
            } 

            return max; 
        } 
    } 
} 