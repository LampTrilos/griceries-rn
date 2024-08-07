import React, {useState} from 'react';
import {CalendarProvider, ExpandableCalendar, Calendar, LocaleConfig, AgendaList} from 'react-native-calendars';
import {View, Text} from "react-native";
import moment from 'moment';
export default function CommonEvents() {
    const [selected, setSelected] = useState('');

    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
    };

    LocaleConfig.defaultLocale = 'fr';

    const renderItem = item => {
        //console.log('--render item---', moment().format('MM/DD/YYYY HH:mm:ss A'));
        const index = moment(item.item.date).format('YYYY-MM-DD');
        return (
            <View
                key={index}
                style={{height: 25, backgroundColor: 'white'}}>
                <Text style={{fontSize: 20}}>{index}</Text>
            </View>
        );
    };

    return (
        <View>
        <CalendarProvider date={'2024-08-01'} showTodayButton={true}>
            <ExpandableCalendar
                onDayPress={day => {
                    setSelected(day.dateString);
                    console.log(day ? day.dateString : 'Pick a day')
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                }}
            />
        </CalendarProvider>
            <AgendaList renderItem={renderItem}
                          sections={
                              [
                                  {
                                      title: 'Yoga',
                                      data: [
                                          {
                                              date: '2024-08-08T06:00:00.000Z',
                                          },
                                      ],
                                  },
                                  {
                                      title: 'Not Yoga',
                                      data: [
                                          {
                                              date: '2024-08-09T06:00:00.000Z',
                                          },
                                      ],
                                  }
                                  ]
                          }/>
        </View>
    );


};
