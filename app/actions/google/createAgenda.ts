import { google } from "googleapis";
import { OAuth2Client } from 'google-auth-library';

interface createAgendaProps {
    eventData: {
        description: string;
        startDate: string;
        endDate: string;
        requestId?: string;
    },
    googleUserAuth: OAuth2Client
}

export const createAgenda = async ({ eventData, googleUserAuth }: createAgendaProps) => {
    const calendar = google.calendar({
        version: 'v3',
        auth: googleUserAuth,
    })

    const event = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: {
            summary: `meeting`,
            description: eventData.description,
            start: {
                dateTime: eventData.startDate,
            },
            end: {
                dateTime: eventData.endDate,
            },
            conferenceData: {
                createRequest: {
                    requestId: eventData.requestId ? eventData.requestId : '12312312312i',
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
            guestsCanSeeOtherGuests: false,
            guestsCanModify: false,
        },
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