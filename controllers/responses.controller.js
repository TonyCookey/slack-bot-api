const responsesModel = require('../models/responses.model')

// save response for a particular question
async function SaveUserResponses(req, res) {
    try {
        if (!req.body.user_email || !req.body.question || !req.body.response) {
            return res.status(400).json({
                error: 'Missing required field(s)',
            });
        }
        const result = await responsesModel.saveUserResponse(req.body.user_email, req.body.question, req.body.response)

        console.log(result);
        if (result) {
            return res.status(201).json({
                message: "Succesfully saved user's response",
                data: {
                    user: result.user,
                    question: result.question,
                    response: result.response
                }
            })
        }
        return res.status(400).json({
            message: "Failed to save user's response",
            error: result
        })



    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "API encountered an error",
        })

    }

}

// get user's responses - all responses for a particular user
async function GetUserResponse(req, res) {
    try {
        if (!req.params.user_email) {
            return res.status(400).json({
                error: 'Missing required field - user email address',
            });
        }
        const result = await responsesModel.getUserResponse(req.params.user_email)

        if (result) {
            return res.status(200).json({
                message: `Succesfully retrieved ${req.body.user_email} responses`,
                data: result
            })
        }
        return res.status(400).json({
            message: "Failed to retrieve user's response",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "API encountered an error",
        })

    }

}

// get user's responses - all responses for a particular user
async function GetUserQuestionResponse(req, res) {
    try {
        if (!req.params.user_email) {
            return res.status(400).json({
                error: 'Missing required field - user email address',
            });
        }
        const result = await responsesModel.getUserQuestionResponse(req.params.user_email, req.params.question)

        if (result) {
            return res.status(200).json({
                message: `Succesfully retrieved ${req.params.user_email}'s response to "${req.params.question}"`,
                data: result
            })
        }
        return res.status(400).json({
            message: "Failed to retrieve user's response to question",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "API encountered an error",
        })

    }

}

// get user's responses - all responses for a particular user
async function GetAllResponses(req, res) {
    try {
        const result = await responsesModel.getAllResponses()
        console.log(result);

        if (result) {
            return res.status(200).json({
                message: `Succesfully retrieved all responses in the system`,
                data: result
            })
        }
        return res.status(400).json({
            message: "Failed to retrieve all responses",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "API encountered an error",
        })

    }

}

module.exports = {
    SaveUserResponses,
    GetUserResponse,
    GetAllResponses,
    GetUserQuestionResponse
}