export default {
      // ...other Vite config options
      build: {
        rollupOptions: {
          input: {
            // Your existing entry point
            index: './index.html',
    
            // New entry point for Hebrew page
            'il': './index-il.html',
            'il/index' : './index-il.html',
            '/il': './index-il.html',
            'il/': './index-il.html',
          },
        },
      },
    };