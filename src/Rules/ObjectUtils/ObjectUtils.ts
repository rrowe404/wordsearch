export class ObjectUtils {
    public static copy<T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj));
    }
}
