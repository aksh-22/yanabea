/* eslint-disable @typescript-eslint/no-unused-vars */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {filterReportData, reportData} from 'src/api/report.service';
import FilterIcon from 'src/assets/svg/filter.svg';
import ContainerWithoutScroll from 'src/components/ContainerWithoutScroll';
import CustomHeader from 'src/components/CustomHeader';
import ListEmptyComponent from 'src/components/ListEmptyComponent';
import LoadingComponent from 'src/components/LoadingComponent';
import Date from 'src/components/reportFilterModal/Date';
import Month from 'src/components/reportFilterModal/Month';
import Range from 'src/components/reportFilterModal/Range';
import ReportFilterModal from 'src/components/reportFilterModal/ReportFilterModal';
import colors from 'src/constants/colors';
import {RootRouteName} from 'src/constants/routeName';
import {
  dateFormatForClient,
  dateFormatForServer,
  getMonthNumber,
} from 'src/utils/dateFormatter';
import {metaDataType} from 'typings/meta-data-type';
import {reportListItemType} from 'typings/report-list-item-type';
import {ReportStyles} from './Report.style';
import ShowDate from './ShowDate';

type IProps = {
  item: reportListItemType;
  index: number;
};

const Report = ({navigation}: NativeStackScreenProps<any>) => {
  const {t} = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const [showCalModal, setShowCalModal] = useState(false);

  const [selected, setSelected] = useState(null);

  const [dateSelected, setDateSelected] = useState<any>({});

  const [listData, setListData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [refreshLoading, setRefreshLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [shouldNext, setShouldNext] = useState(true);

  const onDateChange = date => {
    setDateSelected(date);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onCancelCalModal = () => {
    setShowCalModal(false);
  };

  const onCloseCalModal = d => {
    onDateChange(d);
    setShowCalModal(false);
  };

  const onRemoveFilter = () => {
    setDateSelected({});
    setSelected(null);
    setListData([]);
  };

  const onFilterValueChange = currTab => {
    setSelected(currTab);
    setShowModal(false);
    setTimeout(() => {
      setShowCalModal(true);
    }, 500);
  };

  const onEndReached = () => {
    if (shouldNext && !isLoading) {
      getReportData(page + 1);
      setPage(prev => prev + 1);
    }
  };

  const onRefresh = () => {
    setListData([]);
    getReportData(1);
    setPage(1);
    // setShouldNext(true);
  };

  const actionAfterFetchData = (res, pageNumber) => {
    const metaData: metaDataType = res?.data?.meta_data;
    metaData.total_page < metaData?.current_page && setShouldNext(false);
    if (pageNumber === 1) {
      setListData(res?.data?.ordersdetail);
    } else {
      setListData(prev => [...res?.data?.ordersdetail, ...prev]);
    }
  };

  const getReportData = async pageNumber => {
    setIsLoading(true);
    if (Object.keys(dateSelected).length) {
      const data = {
        type: selected,
        startDate:
          selected === 1
            ? dateFormatForServer(dateSelected?.date)
            : dateFormatForServer(dateSelected?.startDate),
        month: getMonthNumber(dateSelected?.month),
        year: dateSelected?.year,
        endDate: dateFormatForServer(dateSelected?.endDate),
        page: pageNumber,
      };
      await filterReportData(data)
        .then(res => {
          actionAfterFetchData(res, pageNumber);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const data = {
        page: pageNumber,
      };
      await reportData(data)
        .then(res => {
          actionAfterFetchData(res, pageNumber);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getReportData(1);
    setPage(1);
    setShouldNext(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSelected]);

  const showFilter = () => {
    switch (selected) {
      case 1:
        return (
          <Date
            onCancel={onCancelCalModal}
            value={dateSelected}
            onClose={onCloseCalModal}
            show={showCalModal}
          />
        );
      case 2:
        return (
          <Month
            onCancel={onCancelCalModal}
            value={dateSelected}
            onClose={onCloseCalModal}
            show={showCalModal}
          />
        );
      case 3:
        return (
          <Range
            onCancel={onCancelCalModal}
            value={dateSelected}
            onClose={onCloseCalModal}
            show={showCalModal}
          />
        );
      case null:
        <View />;
    }
  };

  const renderItem = ({item, index}: IProps) => {
    const carton = Number(item?.total_carton);
    const chiller = Number(item?.total_chiller);
    return (
      <TouchableOpacity
        style={ReportStyles.listEl}
        onPress={() => {
          navigation.navigate(RootRouteName.REPORT_DETAILS, {item});
        }}>
        <View style={ReportStyles.listElWrapper}>
          <View style={ReportStyles.listElTop}>
            <Text style={ReportStyles.listElTopText}>
              {dateFormatForClient(item?.date)}
            </Text>
          </View>
          <View style={ReportStyles.listElBottom}>
            {carton > 0 ? (
              <Text style={ReportStyles.listElBottomText}>
                {t('drawer:report.details.totalCartoons')} :{' '}
                {item?.total_carton}
              </Text>
            ) : null}
            {chiller > 0 ? (
              <Text style={ReportStyles.listElBottomText}>
                {t('drawer:report.details.totalChillers')} :{' '}
                {item?.total_chiller}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {showFilter()}
      <View style={ReportStyles.filterBox}>
        <View style={ReportStyles.filterInnerBox}>
          <ShowDate
            onPress={() => setShowCalModal(true)}
            selectedDate={dateSelected}
          />
          <View style={ReportStyles.iconContainer}>
            {Object.keys(dateSelected).length ? (
              <TouchableOpacity onPress={onRemoveFilter}>
                <Icons name="close" color={colors.primaryColor} size={30} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{marginStart: Platform.select({android: 5, ios: 10})}}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ContainerWithoutScroll statusBarColor={colors.primaryColor}>
        <CustomHeader
          containerStyle={ReportStyles.headerStyle}
          iconColor={colors.defaultWhite}
          headingStyle={ReportStyles.headerHeadingStyle}
          heading={t('drawer:report.report')}
        />
        <View style={ReportStyles.containerStyle}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshLoading}
                onRefresh={onRefresh}
                tintColor={colors.primaryColor}
                title={t('other:pullToRefresh')}
                titleColor={colors.primaryColor}
              />
            }
            showsVerticalScrollIndicator={false}
            data={listData}
            renderItem={renderItem}
            onEndReached={onEndReached}
            contentContainerStyle={ReportStyles.flatListStyle}
            ListFooterComponentStyle={ReportStyles.flatListStyle2}
            ListEmptyComponent={!isLoading && <ListEmptyComponent />}
            ListFooterComponent={
              isLoading && <LoadingComponent showText={listData?.length < 1} />
            }
          />
        </View>
      </ContainerWithoutScroll>
      <ReportFilterModal
        onChange={onFilterValueChange}
        selectedTab={selected}
        isVisible={showModal}
        onClose={onClose}
      />
    </>
  );
};

export default Report;
