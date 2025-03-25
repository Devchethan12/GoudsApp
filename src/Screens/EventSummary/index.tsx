/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CommonHeader from './CommonHeader';
import {removeHtmlTags} from '../Home';

interface event {
  Address: string;
  Discrption: string;
  EventDate: string;
  EventName: string;
  EventTime: string;
  Id: number;
  Img1: string;
  Img2: string | null;
  Img3: string | null;
}

const {width} = Dimensions.get('window');

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`; // Output: "06-10-2024"
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};

const EventSummary: React.FC = ({route}) => {
  const [eventData, setEventData] = useState<event[]>([]);
  const {event} = route.params;

  const flatListRef = useRef<FlatList>(null); // Create a reference to FlatList
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://api.apgewa.org/Api/GetNewandEvents?Id=${event}`)
      .then(res => setEventData(res.data));
  }, [event]);

  // Auto-scroll logic for images
  useEffect(() => {
    if (eventData.length === 0) {
      console.log(currentIndex);
      return;
    } // Return early if no event data

    const images = [
      eventData[0]?.Img1,
      eventData[0]?.Img2,
      eventData[0]?.Img3,
    ].filter(img => img);

    const totalImages = images.length;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % totalImages;
        if (flatListRef.current) {
          // Scroll to the next index manually
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 3000); // 3 seconds for auto-scroll

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, eventData]);

  const renderImages = () => {
    const images = [
      eventData[0]?.Img1,
      eventData[0]?.Img2,
      eventData[0]?.Img3,
    ].filter(img => img);

    return (
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(image, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Image source={{uri: item ?? ''}} style={styles.image} />
        )}
        // Ensure scroll works for images
        onScrollToIndexFailed={error => {
          console.warn('Error in scroll to index:', error);
          // Handle scrolling out of bounds error by resetting to the first image
          setCurrentIndex(0);
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader title="Event Summary" />
      <View style={styles.imageContainer}>
        {eventData.length > 0 && renderImages()}
      </View>
      <ScrollView>
        {/* Add padding to make room for the image */}
        {eventData.map(item => (
          <View
            key={item.Id}
            style={{
              backgroundColor: '#F7F7F7',
              padding: 16,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              {removeHtmlTags(item.EventName)}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 6,
              }}>
              <Text style={{color: '#666', fontSize: 12, fontWeight: '500'}}>
                <Text style={{color: 'black', fontWeight: '400'}}>Date: </Text>
                {removeHtmlTags(formatDate(item.EventDate))}
              </Text>
              <Text style={{color: '#666', fontSize: 12, fontWeight: '500'}}>
                <Text style={{color: 'black', fontWeight: '400'}}>Time: </Text>
                {removeHtmlTags(formatTime(item.EventTime))}
              </Text>
            </View>
            <Text style={{color: '#666', fontSize: 12, fontWeight: '500'}}>
              <Text style={{color: 'black', fontWeight: '400'}}>Place: </Text>
              {removeHtmlTags(item.Address)}
            </Text>

            <Text style={{fontSize: 12, lineHeight: 20, marginTop: 10}}>
              {removeHtmlTags(item.Discrption)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EventSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    left: 0,
    right: 0,
    height: 400,
    zIndex: 1,
  },
  image: {
    width: width,
    height: 400,
    resizeMode: 'stretch',
  },
});
