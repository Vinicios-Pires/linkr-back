import jwt from "jsonwebtoken";

export const JWTSign = (id, username, email, pictureUrl) => {
  return jwt.sign({ id, username, email, pictureUrl }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });
};

export default JWTSign;
