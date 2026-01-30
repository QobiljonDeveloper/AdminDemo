
export function objectToFormData(
    obj: any,
    formData = new FormData(),
    parentKey = ''
): FormData {
    if (obj === null || obj === undefined) {
        return formData;
    }

    if (obj instanceof File) {
        formData.append(parentKey, obj);
        return formData;
    }

    if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            // For arrays of Files, use the same key (e.g. 'images') so Multer receives an array
            // detailed logic can vary, but standard is `key[index]` or just `key` for multiple files
            // For this project, we prioritize single file handling or specific array keys if needed.
            // Let's stick to standard `key[index]` for objects/strings, but if it is a File, maybe just append it.
            // For simplicity for now:
            const key = `${parentKey}[${index}]`;
            objectToFormData(item, formData, key);
        });
        return formData;
    }

    if (typeof obj === 'object' && !(obj instanceof Date)) {
        // If it's a plain object (not File/Blob), serialize as JSON string specifically for NestJS multipart DTOs
        // This is a common pattern to avoid validatenested issues with flattened keys
        // However, standard is flattening. Let's try flattening first, but ensure it works.
        // Actually, the User said "FormData serialization".
        // Let's implement standard bracket notation robustly.
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            const formKey = parentKey ? `${parentKey}[${key}]` : key;
            if (value instanceof File) {
                formData.append(formKey, value);
            } else if (typeof value === 'object' && value !== null && !(value instanceof File) && !(value instanceof Date)) {
                objectToFormData(value, formData, formKey);
            } else {
                formData.append(formKey, String(value ?? ''));
            }
        });
        return formData;
    }

    // Primitive values (string, number, boolean, Date)
    const value = obj instanceof Date ? obj.toISOString() : String(obj);
    formData.append(parentKey, value);

    return formData;
}
