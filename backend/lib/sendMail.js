import FormData from "form-data";
import Mailgun from "mailgun.js";
const mailgun = new Mailgun(FormData);
const sandbox = "sandbox39d3714af1914cb38cb7eea1d0a39f5b.mailgun.org";
let mg;

const defaultOptions = {
	to: ["grosshop@fn.de"],
	subject: "DefaultOptions",
	html: "<h1>Testing some Mailgun awesomeness!</h1>",
};
export const sendMail = ({ to, subject, html } = defaultOptions) => {
	if (!mg) {
		mg = mailgun.client({
			username: "api",
			key: process.env.MAILGUN_API_KEY,
		});
		mg.messages
			.create(sandbox, {
				from: `Excited User <mailgun@${sandbox}>`,
				to: to,
				subject: subject,
				html: html,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return mg.messages.create(sandbox, {
		from: `Excited User <mailgun@${sandbox}>`,
		to: to,
		subject: subject,
		html: html,
	});
};
