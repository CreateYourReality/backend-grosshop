const passwordResetMailTemplate = ({ name, resetLink }) => `Hi ${
	name || ""
} Please click  <a href='${resetLink || ""}'>here</a>
to reset your password.
if you did not try to reset your password, please ignore this mail.`;
