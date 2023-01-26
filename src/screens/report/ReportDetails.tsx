import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import {getReportDataByDate} from 'src/api/report.service';
import Card from 'src/components/Card';
import ContainerWithoutScroll from 'src/components/ContainerWithoutScroll';
import CustomHeader from 'src/components/CustomHeader';
import Divider from 'src/components/Divider';
import ListEmptyComponent from 'src/components/ListEmptyComponent';
import colors from 'src/constants/colors';
import {dateFormatForClient} from 'src/utils/dateFormatter';
import {orderDetailItemType} from 'typings/order-detail-item-type';
import {reportListItemType} from 'typings/report-list-item-type';
import {ReportStyles} from './Report.style';

type Props = {
  route?: any;
};

type IProps = {
  item: orderDetailItemType;
  index: number;
};

const ReportDetails = ({route}: Props) => {
  const data: reportListItemType = route?.params?.item;

  const {t} = useTranslation();

  const [orderData, setOrderData] = useState<Array<orderDetailItemType>>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const dataToSend = {
      date: data?.date,
    };
    setIsLoading(true);
    await getReportDataByDate(dataToSend)
      .then(res => {
        setOrderData(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderItem = ({item}: IProps) => {
    return (
      <View style={ReportStyles.reportListRow}>
        <Text
          style={[
            ReportStyles.cardHeading,
            ReportStyles.reportListColumn,
            ReportStyles.reportListRowItem,
          ]}>
          {item?.driver_detail?.name}
        </Text>
        <Text
          style={[
            ReportStyles.cardHeading,
            ReportStyles.reportListColumn,
            ReportStyles.reportListRowItemRight,
          ]}>
          {item?.quantity} {item?.item}
        </Text>
      </View>
    );
  };

  return (
    <ContainerWithoutScroll statusBarColor={colors.primaryColor}>
      <CustomHeader
        containerStyle={ReportStyles.headerStyle}
        iconColor={colors.defaultWhite}
        headingStyle={ReportStyles.headerHeadingStyle}
        heading={t('drawer:report.reportDetail')}
      />
      <View style={[ReportStyles.containerStyle, {paddingHorizontal: 20}]}>
        <Card viewStyle={ReportStyles.reportCard}>
          <Text style={ReportStyles.cardHeading}>
            {t('drawer:report.details.orderCompleted')}
          </Text>
          <Text style={ReportStyles.cardValue}>
            {dateFormatForClient(data?.date)}
          </Text>
          <Divider />
          <View style={ReportStyles.reportListView}>
            <View style={ReportStyles.reportListRow}>
              <Text
                style={[
                  ReportStyles.cardHeading,
                  ReportStyles.reportListColumn,
                  ReportStyles.reportListColumnHeading,
                ]}>
                {t('drawer:report.details.driverName')}
              </Text>
              <Text
                style={[
                  ReportStyles.cardHeading,
                  ReportStyles.reportListColumn,
                  // ReportStyles.reportListRowItemRight,
                ]}>
                {t('drawer:report.details.quantity')}
              </Text>
            </View>
            <FlatList
              data={orderData}
              renderItem={renderItem}
              ListFooterComponentStyle={ReportStyles.flatListStyle2}
              ListEmptyComponent={!isLoading && <ListEmptyComponent />}
            />
          </View>
        </Card>
      </View>
    </ContainerWithoutScroll>
  );
};

export default ReportDetails;
