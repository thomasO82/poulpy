const client = require('../services/discBot')
const UserModel = require('../models/userModel')
exports.getAccessToken = async (req, res) => {
    try {
        const code = req.query.code;
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.DISCORD_ID,
                client_secret: process.env.DISCORD_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: "http://localhost:3005/callback",
                scope: 'identify',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const tokenData = await tokenResponse.json();
        return tokenData.access_token;
    } catch (error) {
        throw error
    }
}

exports.getUserData = async (req, res) => {
    const accessToken = await this.getAccessToken(req, res);
    req.session.token_discord = accessToken;
    const response = await fetch('https://discord.com/api/users/@me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const user = await response.json();
    return user
}

exports.getGuild = async () => {
    const guild = await client.guilds.fetch(process.env.GUILD_TOM)
    return guild
}

exports.getMembers = async (user) => {
    try {
        const guild = await this.getGuild();
        if (!guild) {
            console.log("Le serveur spécifié est introuvable.");
            return null;
        }

        const member = await guild.members.fetch(user.id);
        return member;
    } catch (error) {
        if (error.status == 404) {
            throw "Cet utilisateur n'appartiens pas a la guilde"
        } else {
            throw "Un probleme inonnu est survenu"
        }
    }
};

exports.getUserDiscord = async (discordId) => {
    try {
        let user = await UserModel.findOne({ discord_id: discordId })
        return user
    } catch (error) {
        throw error
    }
}

exports.createUser = async (discorUser) => {
    try {
        let user = new UserModel({
            discord_id: discorUser.id,
            discord_username: discorUser.username,
            discord_globalName: discorUser.global_name
        })
        await user.save()
        return user
    } catch (error) {
        throw error
    }
}