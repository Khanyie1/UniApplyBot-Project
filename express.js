// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// app.use(cors());

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'UniApplyBot', 'index.html'));
// });

// app.get("/api/deployment", function(req, res) {
//     return res.json({ 
//         status: "success", 
//         message: "Your deployment was successful!", 
//         timestamp: new Date() 
//     });
// });

// const PORT = process.env.PORT || 1100;
// app.listen(PORT, function() {
//     console.log(`Your application is running on port: ${PORT}`);
// });
