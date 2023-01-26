import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ReportStyles} from './Report.style';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from 'src/constants/colors';
import moment from 'moment';
import Calendar from 'src/assets/svg/calendar.svg';

type Props = {
  selectedDate?: any;
  onPress: () => void;
};

const ShowDate = ({selectedDate, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={ReportStyles.dateWrapper}>
      <View
        style={[
          ReportStyles.dateBoxWrapper,
          {
            backgroundColor: Object.keys(selectedDate).length
              ? colors.defaultWhite
              : colors.transparent,
          },
        ]}>
        {selectedDate?.month ? (
          <View style={ReportStyles.dateBox}>
            <View style={ReportStyles.dateIcon}>
              <Calendar />
            </View>
            <Text style={ReportStyles.dateText}>
              {selectedDate?.month} {selectedDate?.year}
            </Text>
          </View>
        ) : null}
        {selectedDate?.date ? (
          <View style={ReportStyles.dateBox}>
            <View style={ReportStyles.dateIcon}>
              <Calendar />
            </View>
            <Text style={ReportStyles.dateText}>
              {moment(selectedDate?.date).format('MMM Do YYYY')}
            </Text>
          </View>
        ) : null}
        {selectedDate?.startDate ? (
          <View style={ReportStyles.dateBox}>
            <View style={ReportStyles.dateIcon}>
              <Calendar />
            </View>
            <Text style={ReportStyles.dateText}>
              {moment(selectedDate?.startDate).format('MMM Do YYYY')}
            </Text>
            <Icon
              name="arrow-forward-outline"
              color={colors.primaryColor}
              size={20}
            />
          </View>
        ) : null}
        {selectedDate?.endDate ? (
          <View style={ReportStyles.dateBox}>
            <View style={ReportStyles.dateIcon}>
              <Calendar />
            </View>
            <Text style={ReportStyles.dateText}>
              {moment(selectedDate?.endDate).format('MMM Do YYYY')}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ShowDate;
