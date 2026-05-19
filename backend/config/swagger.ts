import path from 'node:path'
import url from 'node:url'

export default {
    path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
    title: 'Passion Lecture API',
    version: '1.0.0',
    description: "Documentation de l'API de Passion Lecture",
    tagIndex: 2,
    productionEnv: 'production',
    info: {
        title: "Passion Lecture API",
        version: '1.0.0',
        description: "Documentation de l'API de Passion Lecture"
    },
    snakeCase: true,

    debug: false,
    ignore: ['/swagger', '/docs'],
    preferredPutPatch: 'PUT',
    common: {
        parameters: {},
        headers: {},
    },
    defaultSecurityScheme: 'BearerAuth',
    persistAuthorization: true,
    showFullPath: false,
}