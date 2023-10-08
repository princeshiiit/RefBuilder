import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {GetReferralBuilderService} from '../service/AppService';
import {Image} from 'react-native';

/**
 * Component for displaying data in a paginated manner with "Next" and "Previous" buttons,
 * a search box, and a filter button.
 */
export function ViewTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [filterApplied, setFilterApplied] = useState(false);

  const fetchData = async (pageNumber, searchText, filterApplied) => {
    try {
      const response = await GetReferralBuilderService(
        pageNumber,
        pageSize,
        searchText,
        filterApplied,
      );
      const parsedData = JSON.parse(response);
      setData(parsedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, searchText, filterApplied);

    const intervalId = setInterval(() => {
      fetchData(page, searchText, filterApplied);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [page, searchText, filterApplied]);

  const renderHeader = () => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'lightgray',
          padding: 10,
        }}>
        <Text style={{color: 'grey', flex: 4, fontWeight: 'bold'}}>Name</Text>
        <Text style={{color: 'grey', flex: 2, fontWeight: 'bold'}}>Phone</Text>
        <Text
          style={{
            color: 'grey',
            flex: 1,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Action
        </Text>
      </View>
    </View>
  );

  const renderFilter = () => (
    <View>
      <View style={styles.searchFilterContainer}>
        <TouchableOpacity onPress={handleFilter} style={styles.filterButton}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/icons/filter.png')}
              style={{width: 20, height: 20, marginRight: 5}}
            />
            <Text style={styles.filterButtonText}>Filter</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, {marginLeft: 10}]}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );

  const renderTitle = () => (
    <View>
      <View style={styles.searchFilterContainer}>
        <Text style={styles.title}>View Records</Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
      }}>
      <View style={{flex: 3}}>
        <Text>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={{color: 'gray'}}>{item.email}</Text>
      </View>
      <Text style={{flex: 2}}>{`${item.mobile}`}</Text>
      <Image
        source={require('../assets/icons/dots.png')}
        style={{width: 20, height: 20}}
      />
    </View>
  );

  const renderFooter = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}>
      <Text>{`Rows per page ${pageSize}  ${
        (page - 1) * pageSize + 1
      } - ${Math.min(page * pageSize, data.length)} of ${data.length}`}</Text>
      <View style={{flexDirection: 'row'}}>
        {page > 1 && (
          <TouchableOpacity onPress={handlePrevPage}>
            <Text style={{color: 'blue'}}>{'<< '}</Text>
          </TouchableOpacity>
        )}
        {page * pageSize < data.length && (
          <TouchableOpacity onPress={handleNextPage}>
            <Text style={{color: 'blue'}}>{' >>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  const handleFilter = () => {
    const filteredData = data.filter(item => {
      const propertyValue = (item.propertyName || '').toString().toLowerCase();
      const searchTextLower = searchText.toLowerCase();
      return propertyValue.includes(searchTextLower);
    });

    setData(filteredData);

    setFilterApplied(true);
  };

  return (
    <View style={styles.container}>
      <View>{renderTitle()}</View>
      <View>{renderFilter()}</View>
      <View style={styles.header}>{renderHeader()}</View>
      <FlatList
        style={styles.content}
        data={data.slice((page - 1) * pageSize, page * pageSize)}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightgray',
    padding: 10,
  },
  content: {
    flex: 1,
  },
  searchFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 20,
  },
});
