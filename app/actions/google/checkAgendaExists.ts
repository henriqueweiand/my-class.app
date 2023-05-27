import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

interface checkAgendaExistsProps {
    eventId?: string;
    googleUserAuth?: OAuth2Client;
    event?: any;
}

export const isAgendaExists = async ({ event, eventId, googleUserAuth }: checkAgendaExistsProps) => {
    let eventInstance = event;

    try {
        if (!event) {
            const calendar = google.calendar({
                version: 'v3',
                auth: googleUserAuth,
            })

            eventInstance = await calendar.events.get({
                calendarId: 'primary',
                eventId: eventId,
            });
        }

        // console.log('checkAgendaExists', event.data.status)
        if (!event || event.data.status === 'cancelled') {
            return false
        }
    } catch (e) {
        return false;
    }

    return true;
}