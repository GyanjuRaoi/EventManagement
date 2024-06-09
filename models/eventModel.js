const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/eventData.json');

class Event {
     
    static getEvents() {
        try{
            if (!fs.existsSync(filePath)) return [];
            const data = fs.readFileSync(filePath);
            return JSON.parse(data);
            
        }
        catch( error ){
            console.error(' Failed to read event: ', error);
            return [];
        }
    }

    static saveEvents(events) {
        try {
            fs.writeFileSync(filePath, JSON.stringify(events, null ,2));
            
        } catch (error) {
            console.error(' Failed to save events: ', error);
        }
    }

    static getEventById(id) {
        try {
            const events = this.getEvents();
            return events.find( event => event.id === id );
            
        } catch (error) {
            console.error(' Failed to get event: ', error);
            return [];
        }
    }

    static createEvent( eventData ) {
        try {
            const events = this.getEvents();
            events.push(eventData);
            this.saveEvents(events);
            
        } catch (error) {
            console.error(' Failed to create event: ', error);
        }
    }

    static updateEvent(id, updateData){
        try {
            let events = this.getEvents();
            events = events.map(event => (event.id === id ? {...event, ...updateData} : event));
            this.saveEvents(events);

        } catch (error) {
            console.error(' Failed to update event: ', error);
        }
    }

    static deleteEvent(id){
        try {
            let events = this.getEvents();
            events = events.filter(event => event.id !== id);
            this.saveEvents(events);

        } catch (error) {
            console.error(' Falied to delete event:', error);
        }
    }

    static getEventByTitle(title){
        try {
            let events = this.getEvents();

            const regex = new RegExp(title, 'i');
            const filteredEvent = events.filter(event => regex.test(event.title))

            return filteredEvent;
            
        } catch (error) {
            console.error(' Failed to filter by title: ', error);
        }
    }

    static getEventByDate(startDate, endDate){
        try {
            let events = this.getEvents();

            const filteredEvent = events.filter( event => {
                const eventStartDate = new Date(event.start_date);
                const eventEndDate = new Date(event.end_date);

                const filterStartDate = new Date(startDate);
                const filterEndDate = new Date(endDate);

                return eventStartDate >= filterStartDate && eventEndDate <= filterEndDate;
            });
            // const startRegex = new RegExp(`^${startDate}`);
            // const endRegex = new RegExp(`^${endDate}`);

            // const filteredEvent = events.filter( event => {
            //     return startRegex.test(event.start_date) && endRegex.test(event.end_date);
            // } )

            return filteredEvent;

        } catch (error) {
            console.error(' Failed to filter event by date: ', error);
        }
    }

}

module.exports = Event;