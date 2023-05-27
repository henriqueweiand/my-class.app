import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

interface getAgendaProps {
    eventId: string,
    googleUserAuth: OAuth2Client
}

export const getAgenda = async ({ eventId, googleUserAuth }: getAgendaProps) => {
    const calendar = google.calendar({
        version: 'v3',
        auth: googleUserAuth,
    })

    const event = await calendar.events.get({
        calendarId: 'primary',
        eventId: eventId,
    });

    if (!event) {
        return {
            event: null,
            status: 'notFound'
        }
    }

    return {
        event,
        status: event.data.status
    };
}