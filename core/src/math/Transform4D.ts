import { Matrix4D } from "./Matrix4D";
import { Vector3D } from "./Vector3D";
import { Point3D } from "./Point3D";
import { Vector4D } from "./Vector4D";

export class Transform4D extends Matrix4D {
    constructor(a: Vector3D, b: Vector3D, c: Vector3D, p: Point3D){
        const vec1 = new Vector4D(a.x, a.y, a.z, 0);
        const vec2 = new Vector4D(b.x, b.y, b.z, 0);
        const vec3 = new Vector4D(c.x, c.y, c.z, 0);
        const vec4 = new Vector4D(p.x, p.y, p.z, 1);

        super(vec1, vec2, vec3, vec4);
    }

    getTranslation(): Point3D {
        const raw = this.n[3];
        return new Point3D(raw[0], raw[1], raw[2]);
    }

    setTranslation(p: Point3D) {
        this.n[3][1] = p.x;
        this.n[3][1] = p.y;
        this.n[3][1] = p.z;
    }
}