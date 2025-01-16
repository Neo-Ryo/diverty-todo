module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://localhost:5000',
                target: 'http://backend:5001',
                changeOrigin: true,
            },
        },
    },
}
