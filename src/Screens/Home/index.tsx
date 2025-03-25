/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {useNavigation} from '@react-navigation/native';
import HomeHeader from './Header';
import axios from 'axios';

const {width} = Dimensions.get('window');

interface Event {
  Address: string;
  Description: string;
  District: string;
  EventDate: string;
  EventName: string;
  EventTime: string;
  Id: number;
  Image1: string;
}
export const removeHtmlTags = (html: string) => {
  return html
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with a space
    .trim(); // Trim extra spaces
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [breakingNews, setBreakingNews] = useState<{Description: string}[]>([]);

  useEffect(() => {
    axios
      .get('http://api.apgewa.org/Api/GetHome')
      .then(res => {
        setEvents(res.data.lsthomeEventsModel);
        setBreakingNews(res.data.lsthomeBreakingNewsModel);
        // Extract banner images
        const images = res.data.lsthomeBannersModel.map(
          (item: {BannerImage: string}) => item.BannerImage,
        );
        setBannerImages(images);
      })
      .catch(error => console.error('Error fetching banners:', error));
  }, []);

  // Function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    const cleanText = removeHtmlTags(text); // Remove HTML tags
    return cleanText.length > maxLength
      ? cleanText.substring(0, maxLength) + '...'
      : cleanText;
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      {breakingNews.length > 0 && (
        <View style={styles.breakingNewsContainer}>
          <Text style={styles.breakingNewsHeading}>Breaking News</Text>
          <Carousel
            loop
            width={width}
            height={80}
            autoPlay
            style={{alignSelf: 'center'}}
            data={breakingNews}
            renderItem={({item}) => (
              <View style={[styles.breakingNewsContainer, {padding: 8}]}>
                <Text style={styles.breakingNewsText}>
                  {removeHtmlTags(item.Description)}
                </Text>
              </View>
            )}
          />
        </View>
      )}

      {bannerImages.length > 0 && (
        <Carousel
          loop
          width={width}
          height={200}
          autoPlay
          autoPlayInterval={3000}
          data={bannerImages}
          scrollAnimationDuration={1000}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={styles.image} />
          )}
        />
      )}

      {/* FlatList for Events */}
      <View style={styles.listContainer}>
        <Text style={styles.heading}>Upcoming Events</Text>
        <FlatList
          data={events}
          keyExtractor={item => item.Id.toString()}
          renderItem={({item}) => (
            <Pressable
              style={styles.eventCard}
              onPress={() => {
                navigation.navigate('EventSummary', {
                  event: item.Id.toString(),
                });
              }}>
              <Text style={styles.eventName}>
                {removeHtmlTags(item.EventName)}
              </Text>
              <Text style={styles.eventDate}>
                {item.EventDate} | {item.EventTime}
              </Text>
              <Text style={styles.eventDescription}>
                {truncateText(item.Description, 100)}
              </Text>
              <Text style={styles.readMore}>Read More →</Text>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  breakingNewsContainer: {
    backgroundColor: '#f8d7da', // Light red background
    paddingVertical: 6,
    marginHorizontal: 14,
    marginBottom: 20, // Add bottom margin to create spacing
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  breakingNewsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721c24', // Dark red for the heading
    marginBottom: 8,
    textAlign: 'center',
  },
  breakingNewsText: {
    fontSize: 12,
    color: '#721c24', // Dark red color for the text
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderColor: '#007bff',
    paddingBottom: 4,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: width - 20,
    height: 200,
    borderRadius: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 3,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  eventCard: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  eventDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
  },
  readMore: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Home;
