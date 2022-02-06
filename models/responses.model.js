const Responses = require('./responses.mongo')

// get all responses in the system - Admin
async function getAllResponses() {

    try {
        const responses = Responses.find({}, { '_id': 0, '__v': 0 })
        return responses
    } catch (error) {
        console.error(err)
        throw new Error("Could not get user's responses")
    }

}
// get a user's response(s) to all question(s)
async function getUserResponse(user_email) {

    try {
        const responses = await Responses.find({
            user: user_email
        }, { '_id': 0, '__v': 0 })
        return responses
    } catch (error) {
        console.error(err)
        throw new Error("Could not get user's responses")
    }
}
// get a user's response to a particular question
async function getUserQuestionResponse(user_email, question) {

    try {
        const responses = await Responses.find({
            user: user_email,
            question: question
        }, { '_id': 0, '__v': 0 })
        return responses
    } catch (error) {
        console.error(err)
        throw new Error("Could not get user's responses")
    }
}

// update/insert a existing/new response to a question
async function saveUserResponse(user_email, question, response) {
    try {
        const responses = await Responses.findOneAndUpdate({
            user: user_email,
            question: question
        }, {
            response
        }, {
            upsert: true,
        });
        return responses
    } catch (error) {
        console.error(err)
        throw new Error("Could not save user's responses")
    }

}

module.exports = {
    saveUserResponse,
    getAllResponses,
    getUserResponse,
    getUserQuestionResponse
}