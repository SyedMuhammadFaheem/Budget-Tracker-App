const bcrypt= require('bcrypt')
const hashPassword = async (password)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error occurred while hashing password: ' + error.message);
    }
}


const verifyPassword = async (password, hashedPassword)=>{
    try {
        const result = await bcrypt.compare(password, hashedPassword);
        return result;
    } catch (error) {
        throw new Error('Error occurred while comparing passwords: ' + error.message);
    }
}

module.exports = {
    hashPassword, verifyPassword
}