/* eslint-disable no-param-reassign */
"use strict";

const DefaultSettings = {
	"blacklist": {},
	"delay": 150,
	"enabled": true
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		return { ...DefaultSettings, ...settings };
	} else if (from_ver === null) {
		return DefaultSettings;
	} else {
		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}
		switch (to_ver) {
			default:
				// eslint-disable-next-line no-case-declarations
				const oldsettings = settings;
				settings = Object.assign(DefaultSettings, {});
				for (const option in oldsettings) {
					if (settings[option] !== undefined) {
						settings[option] = oldsettings[option];
					}
				}
				break;
		}

		return settings;
	}
};