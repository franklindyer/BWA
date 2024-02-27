"use strict";
var Savefile = {
    retrieve_savefile: function () {
        this.complete_savefile = JSON.parse(localStorage.getItem("savefile"));
        this.this_savefile = deepClone(this.complete_savefile.games[this.complete_savefile.current_game]);
    },
    save_changes: function () {
        this.complete_savefile.games[this.complete_savefile.current_game] = deepClone(this.this_savefile);
        localStorage.setItem("savefile", JSON.stringify(this.complete_savefile));
    },
    set_death_checkpoint: function () {
        for (var i in this.this_savefile) {
            if (i != "death_checkpoint") {
                this.this_savefile.death_checkpoint[i] = deepClone(this.this_savefile)[i];
            }
        }
    },
    death_overwrite: function () {
        for (var i in this.this_savefile.death_checkpoint) {
            this.this_savefile[i] = this.this_savefile.death_checkpoint[i];
        }
    },
    change_this_savefile: function (updates) {
        for (var i in updates) {
            this.this_savefile[i] = deepClone(updates)[i];
        }
    },
};
//# sourceMappingURL=Savefile.js.map