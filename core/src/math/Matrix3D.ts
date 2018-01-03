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

    multMatrix(bMatrix: Matrix3D): Matrix3D {
        const a  = this.n;
        const b = bMatrix.n;

        const vecA = new Vector3D(a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0],
                                  a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1],
                                  a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2]);
        const vecB = new Vector3D(a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0],
                                  a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1],
                                  a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2]);
        const vecC = new Vector3D(a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0],
                                  a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1],
                                  a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2]);

        return new Matrix3D(vecA, vecB, vecC);
    }

    multVector(v: Vector3D): Vector3D {
        const a = this.n;

        return new Vector3D(a[0][0] * v.x + a[0][1] * v.y + a[0][2] + v.z,
                            a[1][0] * v.x + a[1][1] * v.y + a[1][2] + v.z,
                            a[2][0] * v.x + a[2][1] * v.y + a[2][2] + v.z);
    }
}