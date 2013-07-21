Current Structure
=================

* AssetLoader
* Audio
* CameraControls
* Config
* Constants
* Events
* External ( THREE, etc. )
* GameObject
* HUD
* Initialization
* IO
* Layer
* LayerManager
* LocalStorage
* Particles
* Planet
* Pool
* Renderer
* Rockets
* Ship
* Skybox
* Starfield
* Utils
* Weapon


Ideal Structure
===============
* GameObject
	* Ship
	* Skybox
	* Starfield
	* Planet
		* Jupiter
		* Io
		* Ganymede
	* Sun

	* Weapon
		* GeometryWeapon
			* Rockets
			* Bombs
			* Countermeasures
		* ParticleWeapon


GameObject Structure
====================
* GameObject
	* options
		* layerManager (so we can get lists of particle weapons, geometry weapons, and game objects for collision detection)
		* assetLoader (for easily assigning assets to materials/meshes/geometries)
		* renderer (to easily add tick functions to the render cycle)

	* renderables array
	* collideWithParticleWeapons (eg. for weapon -> ship collisions, but also to stop particle -> particle collision)
	* collideWithGeometryWeapons (eg. for weapon -> ship collisions)
	* collideWithGameObjects (eg. for ship -> ship collisions)
	* targetable (flag to determine whether players can target this game object)

	* checkCollisionWithParticleWeapons()
	* checkCollisionWithGeometryWeapons()
	* checkCollisionWithGameObjects()



* Ship
	* All of GameObject
	* targetable = 1;
	* collideWithParticleWeapons = 1;
	* collideWithGeometryWeapons = 1;
	* collideWithGameObjects = 1;

* Skybox
	* All of GameObject

* Starfield
	* All of GameObject

* Planet