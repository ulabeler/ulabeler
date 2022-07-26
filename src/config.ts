import dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: process.env.PORT ? !isNaN(parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3000 : 3000,
};
