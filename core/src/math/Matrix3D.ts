import { Vector3D } from './Vector3D'

export class Matrix3D {
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

    makeRotationX(t: number): Matrix3D {
        const a = this.defineCosAndSin(t);

        const vec1 = new Vector3D(1, 0, 0);
        const vec2 = new Vector3D(0, a[0], -a[1]);
        const vec3 = new Vector3D(0, a[1], a[0]);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeRotationY(t: number): Matrix3D {
        const a = this.defineCosAndSin(t);

        const vec1 = new Vector3D(a[0], 0, a[1]);
        const vec2 = new Vector3D(0, 1, 0);
        const vec3 = new Vector3D(-a[1], 0, a[0]);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeRotationZ(t: number): Matrix3D {
        const a = this.defineCosAndSin(t);

        const vec1 = new Vector3D(a[0], -a[1], 0);
        const vec2 = new Vector3D(a[1], a[0], 0);
        const vec3 = new Vector3D(0, 0, 1);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeRotation(angle: number, a: Vector3D): Matrix3D {
        const c = this.defineCosAndSin(angle);
        const d = 1 - c[0];

        const x = a.x * d;
        const y = a.y * d;
        const z = a.z * d;

        const axay = x * a.y;
        const axaz = x * a.z;
        const ayaz = y * a.z;

        const vec1 = new Vector3D(c[0] + x * a.x, axay - c[1] * a.z, axaz + c[1] * a.y);
        const vec2 = new Vector3D(axay + c[1] * a.z, c[0] + y * a.y, ayaz - c[1] * a.x);
        const vec3 = new Vector3D(axaz - c[1] * a.y, ayaz + c[1] * a.x, c[0] + z * a.z);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeReflection(a: Vector3D): Matrix3D {
        const x = a.x * -2;
        const y = a.y * -2;
        const z = a.z * -2;

        const axay = x * a.y;
        const axaz = x * a.z;
        const ayaz = y * a.z;

        const vec1 = new Vector3D(x * a.x + 1, axay, axaz);
        const vec2 = new Vector3D(axay, y * a.y + 1, ayaz);
        const vec3 = new Vector3D(axaz, ayaz, z * a.z + 1);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeInvolution(a: Vector3D): Matrix3D {
        const x = a.x * 2;
        const y = a.y * 2;
        const z = a.z * 2;

        const axay = x * a.y;
        const axaz = x * a.z;
        const ayaz = y * a.z;

        const vec1 = new Vector3D(x * a.x - 1, axay, axaz);
        const vec2 = new Vector3D(axay, y * a.y - 1, ayaz);
        const vec3 = new Vector3D(axaz, ayaz, z * a.z - 1);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeScale(sx: number, sy: number, sz: number): Matrix3D {
        const vec1 = new Vector3D(sx, 0, 0);
        const vec2 = new Vector3D(0, sy, 0);
        const vec3 = new Vector3D(0, 0, sz);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeVectorScale(s: number, a: Vector3D) {
        s -= 1;
        const x = a.x * s;
        const y = a.y * s;
        const z = a.z * s;

        const axay = x * a.y;
        const axaz = x * a.z;
        const ayaz = y * a.z;

        const vec1 = new Vector3D(x * a.x + 1, axay, axaz);
        const vec2 = new Vector3D(axay, y * a.y + 1, ayaz);
        const vec3 = new Vector3D(axaz, ayaz, z * a.z + 1);

        return new Matrix3D(vec1, vec2, vec3);
    }

    makeSkew(t: number, a: Vector3D, b: Vector3D) {
        t = Math.tan(t);
        const x = a.x * t;
        const y = a.y * t;
        const z = a.z * t;

        const vec1 = new Vector3D(x * b.x + 1, x * b.y, x * b.z);
        const vec2 = new Vector3D(y * b.x, y * b.y + 1, y * b.z);
        const vec3 = new Vector3D(z * b.x, z * b.y, z * b.z + 1);

        return new Matrix3D(vec1, vec2, vec3);
    }

    defineCosAndSin(angle: number): [number, number] {
        return [Math.cos(angle), Math.sin(angle)];
    }
}