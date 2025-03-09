module.exports = function BroochCdFix(mod) {
    mod.game.initialize('inventory');

    mod.hook('S_ABNORMALITY_BEGIN', 4, { order: -999999 }, (e) => {
        if (!mod.game.me.is(e.target) || e.id !== 301807) return;
        setCd(Number(e.duration));
    });

    mod.hook('S_ABNORMALITY_END', 1, { order: -999999 }, (e) => {
        if (!mod.game.me.is(e.target) || e.id !== 301807) return;
        setCd(0);
    });

    function setCd(duration) {
        mod.send('S_START_COOLTIME_SKILL', 3, {
            skill: { reserved: 0, npc: false, type: 1, huntingZoneId: 0, id: 98150023 },
            cooldown: duration
        });

        mod.send('S_START_COOLTIME_ITEM', 1, {
            item: mod.game.inventory.equipment.slots['20'].id,
            cooldown: Math.floor(duration / 1000)
        });
    }
}