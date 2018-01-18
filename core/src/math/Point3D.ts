import { Vector3D } from "./Vector3D";

export class Point3D extends Vector3D {
    add(b: Point3D): Point3D {
        const a = this;
        return new Point3D(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    sub(b: Point3D): Point3D {
        const a = this;
        return new Point3D(a.x - b.x, a.y - b.y, a.z - b.z);
    }
}
