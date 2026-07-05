require('dotenv').config();
const { Client, RichPresence } = require('discord.js-selfbot-v13');
const config = require('./config.json');

const client = new Client({ checkUpdate: false });
client.on('ready', async () => {
    console.log(`Login: ${client.user.username}`);
    try {
        if (!config.applicationId) {
            console.error('Error: applicationId is not set in config.json');
            return;
        }
        if (!config.type) {
            console.error('Error: type is not set in config.json');
            return;
        }
        console.log('ApplicationId:', config.applicationId);
        const rpc = new RichPresence(client)
            .setApplicationId(config.applicationId)
            .setType(config.type) // Options: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING base on config
            .setName(config.name);

        // Set the Rich Presence details based on the config
        if (config.url) rpc.setURL(config.url);
        if (config.details) rpc.setDetails(config.details);
        if (config.state) rpc.setState(config.state);
        if (config.party && config.party.max > 0) {
            rpc.setParty({ max: config.party.max, current: config.party.current });
        }
        if (config.useStartTimestamp) {
            rpc.setStartTimestamp(Date.now());
        }
        if (config.assets) {
            try {
                // Large image
                if (config.assets.largeImage) {
                    const large = await RichPresence.getExternal(client, config.applicationId, config.assets.largeImage);
                    if (large && large[0]) rpc.setAssetsLargeImage(large[0].external_asset_path);
                }
                if (config.assets.largeText) rpc.setAssetsLargeText(config.assets.largeText);
            } catch (error) {
                console.error("Large Image Error: ", error.message);
            }
            try {
                // Small image
                if (config.assets.smallImage) {
                    const small = await RichPresence.getExternal(client, config.applicationId, config.assets.smallImage);
                    if (small && small[0]) rpc.setAssetsSmallImage(small[0].external_asset_path);
                }
                if (config.assets.smallText) rpc.setAssetsSmallText(config.assets.smallText);
            } catch (error) {
                console.error("Small Image Error: ", error.message);
            }
        }
        if (config.buttons && config.buttons.length > 0) {
            if (config.buttons.length > 2) {
                    console.warn('Warning: Discord only supports up to 2 buttons. Extra buttons will be ignored.');
                    return;
                }
            config.buttons.forEach(btn => {
                rpc.addButton(btn.label, btn.url);
            });
        }
        // Set the Rich Presence
        client.user.setActivity(rpc);
        console.log('Rich Presence updated successfully!');
    } catch (error) {
        console.error('Error updating Rich Presence:', error.message);
    }
});

client.login(process.env.DISCORD_TOKEN);