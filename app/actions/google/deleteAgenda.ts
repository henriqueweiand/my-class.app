import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

interface deleteAgendaProps {
    eventId: string,
    googleUserAuth: OAuth2Client
}

export const deleteAgenda = async ({ eventId, googleUserAuth }: deleteAgendaProps) => {
    const calendar = google.calendar({
        version: 'v3',
        auth: googleUserAuth,
    })

    const event = await calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
    })

    if (!event) {
        return {
            event: null,
        }
    }

    return {
        event,
    };
}