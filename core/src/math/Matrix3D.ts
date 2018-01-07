import { Vector3D } from './Vector3D'

class Matrix3D {
    public n: [[number, number, number],[number, number, number],[number, number, number]];

    public a: Vector3D;
    public b: Vector3D;
    public c: Vector3D;

    constructor(a: Vector3D, b: Vector3D, c: Vector3D)
    {
        this.n[0][0] = a.x; this.n[0][1] = a.y; this.n[0][2] = a.z;
        this.n[1][0] = b.x; this.n[1][1] = b.y; this.n[1][2] = b.z;
        this.n[2][0] = c.x; this.n[2][1] = c.y; this.n[2][2] = c.z;
        this.a = a;
        this.b = b;
        this.c = c;
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

    determinant(): number {
        const n = this.n;
        return (n[0][0] * (n[1][1] * n[2][2] - n[1][2] * n[2][1]))
            +  (n[0][1] * (n[1][2] * n[2][0] - n[1][0] * n[2][2]))
            +  (n[0][2] * (n[1][0] * n[2][1] - n[1][1] * n[2][0]));
    }

    inverse(): Matrix3D {
        const a = this.a; const b = this.b; const c = this.c;

        const r0 = b.crossProduct(c);
        const r1 = c.crossProduct(a);
        const r2 = a.crossProduct(b);

        let invDet = 1 / r2.dotProduct(c);

        const vec1 = new Vector3D(r0.x * invDet, r0.y * invDet, r0.z * invDet);
        const vec2 = new Vector3D(r1.x * invDet, r1.y * invDet, r1.z * invDet);
        const vec3 = new Vector3D(r2.x * invDet, r2.y * invDet, r2.z * invDet);

        return new Matrix3D(vec1, vec2, vec3);
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