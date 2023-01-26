/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import Card from 'src/components/Card';
import ContainerWithoutScroll from 'src/components/ContainerWithoutScroll';
import CustomHeader from 'src/components/CustomHeader';
import colors from 'src/constants/colors';
import {dateFormatForClient} from 'src/utils/dateFormatter';
import {ReportStyles} from './Report.style';

type Props = {
  route?: any;
};

const QrCodeDataDetails = ({route}: Props) => {
  const data = route?.params?.scannedData;

  const {t} = useTranslation();

  const renderItem = ({item}) => (
    <View style={ReportStyles.listEl}>
      <View style={ReportStyles.listElWrapper}>
        <View style={ReportStyles.listElTop}>
          <Text style={ReportStyles.listElTopText}>
            #{item?.order_detail_id}
          </Text>
        </View>
        <View style={ReportStyles.listElBottom}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                ReportStyles.cardHeading,
                // ReportStyles.reportListColumn,
                ReportStyles.fl,
              ]}>
              {t('drawer:report.details.driverName')} :-
            </Text>
            <Text style={[ReportStyles.qrListEl]}>{item?.driver_name}</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={[
                ReportStyles.cardHeading,
                // ReportStyles.reportListColumn,
                ReportStyles.fl,
              ]}>
              {t('drawer:report.details.quantity')} :-
            </Text>
            <Text style={[ReportStyles.qrListEl]}>
              {item?.quantity} {item?.item}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ContainerWithoutScroll statusBarColor={colors.primaryColor}>
      <CustomHeader
        containerStyle={ReportStyles.headerStyle}
        iconColor={colors.defaultWhite}
        headingStyle={ReportStyles.headerHeadingStyle}
        heading={t('drawer:report.reportDetail')}
      />
      <View style={ReportStyles.containerStyle}>
        <Card viewStyle={ReportStyles.qrReportCard}>
          <Text style={ReportStyles.cardHeading}>
            {t('drawer:report.details.orderCompleted')}
          </Text>
          <Text style={ReportStyles.cardValue}>
            {dateFormatForClient(data?.scanned_date)}
          </Text>
          {/* <Divider /> */}
        </Card>
        <View style={ReportStyles.reportListView}>
          <FlatList renderItem={renderItem} data={data?.lists} />
        </View>
      </View>
    </ContainerWithoutScroll>
  );
};

export default QrCodeDataDetails;
