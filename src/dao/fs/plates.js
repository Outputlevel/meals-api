import fs from 'fs';

process.loadEnvFile();

export class PlatesDAO {
    constructor() {
        this.plates = [];
        this.imgsDir = process.env.SITE_URL + '/public/imgs';
    }

    async getPlates() {
        try {
            const data = JSON.parse(fs.readFileSync('db.json'));
            this.plates = data;
            if (data === null || data.length === 0) return null;
            const urlUpdated = this.addSiteToImg(this.plates);
            return this.plates;
        } catch (error) {
            console.error('Error getting plates: ', error);
            return { error: error };
        }
    }
    async getPlate(plateId) {
        try {
            const data = JSON.parse(fs.readFileSync('db.json'));
            this.plates.push(data.find(plate => plate.id === plateId) );
            //getting [undefined] validate
            if (this.plates[0] === undefined) return null;
            const urlUpdated = this.addSiteToImg(this.plates);
            if (!urlUpdated) return null;
            return this.plates;
        } catch (error) {
            console.error('Error getting plate: ', error);
            return { error: error };
        }
    }

    /* async addPlate(plate) {
        try {
            this.plates.push(plate);
            fs.writeFileSync('db.json', JSON.stringify(this.plates));
            return { message: 'Plate added successfully!' };
        } catch (error) {
            console.error('Error adding plate: ', error);
            return { error: error };
        }
    } */
   addSiteToImg(data){
        try {
            console.log(data)
            if (data.length === 0) {
                return false;
            }
            const imgsDir = this.imgsDir;
            const plates = data.map(plate => {
                plate.img = `${imgsDir}/${plate.img}`;
                return plate;
            });
            this.plates = plates;
            return true;
        } catch (error) {
            console.error('Error adding site to img: ', error);
            return false;
        }
   }
}