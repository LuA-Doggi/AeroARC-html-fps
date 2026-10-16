(function () {
    window.AeroARCMaps = window.AeroARCMaps || {};

    window.AeroARCMaps.openArena = function ({ THREE, CANNON, scene, world, groundMaterial, collidableMeshes }) {
        const addStaticBox = (size, position, rotation, color) => {
            const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
            const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.08 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(position.x, position.y, position.z);
            mesh.rotation.set(rotation.x, rotation.y, rotation.z);
            scene.add(mesh);
            collidableMeshes.push(mesh);

            const body = new CANNON.Body({ mass: 0, material: groundMaterial });
            body.addShape(new CANNON.Box(new CANNON.Vec3(size.x * 0.5, size.y * 0.5, size.z * 0.5)));
            body.position.set(position.x, position.y, position.z);
            body.quaternion.setFromEuler(rotation.x, rotation.y, rotation.z, 'XYZ');
            world.addBody(body);
            return mesh;
        };

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(220, 220),
            new THREE.MeshStandardMaterial({ color: 0x343b46, roughness: 0.88, metalness: 0.04 })
        );
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);
        collidableMeshes.push(floor);

        const floorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Plane(), material: groundMaterial });
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        world.addBody(floorBody);

        const grid = new THREE.GridHelper(220, 110, 0x53606d, 0x414b57);
        grid.position.y = 0.015;
        scene.add(grid);

        const cyan = 0x286b76;
        const red = 0x7f3d4e;
        const stone = 0x515b67;

        addStaticBox(new THREE.Vector3(16, 2, 12), new THREE.Vector3(0, 1, 0), new THREE.Vector3(), stone);
        addStaticBox(new THREE.Vector3(22, 1.2, 7), new THREE.Vector3(-24, 0.6, -3), new THREE.Vector3(), cyan);
        addStaticBox(new THREE.Vector3(22, 1.2, 7), new THREE.Vector3(24, 0.6, 3), new THREE.Vector3(), red);
        addStaticBox(new THREE.Vector3(8, 1.5, 24), new THREE.Vector3(-2, 8, -28), new THREE.Vector3(), stone);
        addStaticBox(new THREE.Vector3(8, 1.5, 24), new THREE.Vector3(2, 12, 28), new THREE.Vector3(), stone);
        addStaticBox(new THREE.Vector3(28, 1.2, 7), new THREE.Vector3(-37, 5, 22), new THREE.Vector3(0, 0, 0.12), cyan);
        addStaticBox(new THREE.Vector3(28, 1.2, 7), new THREE.Vector3(37, 7, -22), new THREE.Vector3(0, 0, -0.12), red);
        addStaticBox(new THREE.Vector3(7, 1, 26), new THREE.Vector3(-54, 1, -14), new THREE.Vector3(0, 0, 0.38), stone);
        addStaticBox(new THREE.Vector3(7, 1, 26), new THREE.Vector3(54, 1, 14), new THREE.Vector3(0, 0, -0.38), stone);

        addStaticBox(new THREE.Vector3(12, 1, 28), new THREE.Vector3(-15, 2, 19), new THREE.Vector3(-0.36, 0, 0), cyan);
        addStaticBox(new THREE.Vector3(12, 1, 28), new THREE.Vector3(15, 2, -19), new THREE.Vector3(0.36, 0, 0), red);
        addStaticBox(new THREE.Vector3(22, 1, 6), new THREE.Vector3(-29, 7, -27), new THREE.Vector3(0, 0, 0), stone);
        addStaticBox(new THREE.Vector3(22, 1, 6), new THREE.Vector3(29, 9, 27), new THREE.Vector3(0, 0, 0), stone);

        const launchPads = [
            { position: new THREE.Vector3(-33, 0, -13), direction: new THREE.Vector3(0.3, 0, -1) },
            { position: new THREE.Vector3(33, 0, 13), direction: new THREE.Vector3(-0.3, 0, 1) },
            { position: new THREE.Vector3(-5, 0, 39), direction: new THREE.Vector3(0, 0, -1) },
            { position: new THREE.Vector3(5, 0, -39), direction: new THREE.Vector3(0, 0, 1) }
        ];

        for (const pad of launchPads) {
            const ring = new THREE.Mesh(
                new THREE.CylinderGeometry(2.15, 2.15, 0.12, 32),
                new THREE.MeshStandardMaterial({ color: 0x38d8d1, emissive: 0x126c68, roughness: 0.35, metalness: 0.35 })
            );
            ring.position.set(pad.position.x, 0.08, pad.position.z);
            scene.add(ring);
        }

        return {
            spawn: new CANNON.Vec3(0, 3, 22),
            launchPads,
            weaponSpawns: [
                { type: 'p15', position: new CANNON.Vec3(-8, 1.2, 7) },
                { type: 'smg', position: new CANNON.Vec3(12, 1.2, -9) },
                { type: 'smg', position: new CANNON.Vec3(-30, 1.2, -32) }
            ]
        };
    };
})();