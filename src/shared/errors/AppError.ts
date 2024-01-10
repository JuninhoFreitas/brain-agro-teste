class AppError {
public readonly message: string;
public readonly statusCode: number;

constructor(message: string, statusCode = 400, err?: Error) {
	this.message = message;
	this.statusCode = statusCode;
	this.log(err);
}
log(err?: Error) {
	if (process.env.NODE_ENV == 'DEV') {
		console.log(err);
	}
}
}

export default AppError;
