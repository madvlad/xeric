import { Vector3D } from './Vector3D'

class Matrix3D {
    public n: number[][];

    constructor(a: Vector3D, b: Vector3D, c: Vector3D)
    {
        this.n[0][0] = a.x; this.n[0][1] = a.y; this.n[0][2] = a.z;
        this.n[1][0] = b.x; this.n[1][1] = b.y; this.n[1][2] = b.z;
        this.n[2][0] = c.x; this.n[2][1] = c.y; this.n[2][2] = c.z;
    }
    
    getVectorA(): Vector3D {
        return new Vector3D(this.n[0][0], this.n[0][1], this.n[0][2]);
    }
    
    getVectorB(): Vector3D {
        return new Vector3D(this.n[1][0], this.n[1][1], this.n[1][2]);
    }

    getVectorC(): Vector3D {
        return new Vector3D(this.n[2][0], this.n[2][1], this.n[2][2]);
    }
}