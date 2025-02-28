import { MoodPlaylistMap } from "@/types/music";

// Sample playlists organized by mood and language
export const playlists: MoodPlaylistMap = {
  happy: {
    hindi: {
      id: "happy-hindi",
      name: "Happy Hindi",
      description: "Upbeat Hindi songs to brighten your day",
      coverImage: "/images/playlists/happy-hindi.jpg",
      songs: [
        {
          id: "happy-hindi-1",
          title: "Badtameez Dil",
          artist: "Benny Dayal",
          albumArt: "https://drive.google.com/uc?export=view&id=1LXJkNd9Rc7TmzK_wXJQbDekNvWMYdvxz",
          audioUrl: "https://drive.google.com/uc?export=view&id=1Rw0qUZGLitaZzTnbXt6f1B6BK9nfbixZ",
          duration: 231
        },
        {
          id: "happy-hindi-2",
          title: "Kar Gayi Chull",
          artist: "Badshah, Fazilpuria",
          albumArt: "https://drive.google.com/uc?export=view&id=1CgZ1MKT5pAmX1EALFikxf330FJtflXi3",
          audioUrl: "https://drive.google.com/uc?export=view&id=1dQ-mEkvuaNU-XUzgGBNJOJ2XQbRsTHiA",
          duration: 185
        },
        {
          id: "happy-hindi-3",
          title: "London Thumakda",
          artist: "Labh Janjua, Sonu Kakkar",
          albumArt: "https://drive.google.com/uc?export=view&id=1mSJnzWy5H_g1nZEWF9lWZiDG1VRVmJrN",
          audioUrl: "https://drive.google.com/uc?export=view&id=1L6wH9Rb8sTFxPJm1LlMC1QHBCzJLJlRR",
          duration: 196
        }
      ]
    },
    english: {
      id: "happy-english",
      name: "Happy English",
      description: "Feel-good English tracks for a positive mood",
      coverImage: "/images/playlists/happy-english.jpg",
      songs: [
        {
          id: "happy-english-1",
          title: "Happy",
          artist: "Pharrell Williams",
          albumArt: "https://drive.google.com/uc?export=view&id=1YMHuSdZOtZn6MnTxLIuBu3pgmwbWpd3O",
          audioUrl: "https://drive.google.com/uc?export=view&id=1aLFl2O98L6f8AY_cKqUO0Z-cYzrDYQlP",
          duration: 233
        },
        {
          id: "happy-english-2",
          title: "Can't Stop the Feeling",
          artist: "Justin Timberlake",
          albumArt: "https://drive.google.com/uc?export=view&id=1aOvdMBK7XsfRb44LIwBitTStRkUqxSvU",
          audioUrl: "https://drive.google.com/uc?export=view&id=1CYrZf2JV-nJPJEzqtOwFrUzqFbZ4RGpN",
          duration: 238
        },
        {
          id: "happy-english-3",
          title: "Uptown Funk",
          artist: "Mark Ronson ft. Bruno Mars",
          albumArt: "https://drive.google.com/uc?export=view&id=1kJEHCMeseJ5RUEm2c2yCvfFU6A0BEaQl",
          audioUrl: "https://drive.google.com/uc?export=view&id=1-NVHDOwldAjdWLyBEiQb7O51NpVK52l7",
          duration: 270
        }
      ]
    },
    mixed: {
      id: "happy-mixed",
      name: "Happy Mix",
      description: "A mix of happy tunes in different languages",
      coverImage: "/images/playlists/happy-mixed.jpg",
      songs: [
        {
          id: "happy-mixed-1",
          title: "Nagada Sang Dhol",
          artist: "Shreya Ghoshal, Osman Mir",
          albumArt: "https://drive.google.com/uc?export=view&id=1wB5aTTVQY0Cj8dBr-oDhNsVj5pXDRiTX",
          audioUrl: "https://drive.google.com/uc?export=view&id=1aBwE3BgPQ2tN9pAaE5DXnzrQHUdxbBDH",
          duration: 244
        },
        {
          id: "happy-mixed-2",
          title: "I Feel Good",
          artist: "James Brown",
          albumArt: "https://drive.google.com/uc?export=view&id=1i2zf857XjhI-bBFuDQnXEXpj9XLH5XZb",
          audioUrl: "https://drive.google.com/uc?export=view&id=1KnBtJQ2EloZsHr4DzmqWl7z3x-gCXnJK",
          duration: 162
        }
      ]
    }
  },
  sad: {
    hindi: {
      id: "sad-hindi",
      name: "Sad Hindi",
      description: "Emotional Hindi songs for those reflective moments",
      coverImage: "/images/playlists/sad-hindi.jpg",
      songs: [
        {
          id: "sad-hindi-1",
          title: "Channa Mereya",
          artist: "Arijit Singh",
          albumArt: "https://drive.google.com/uc?export=view&id=1Qe6qgDZCPAME7n0lheAgRY8bHmPH6h2p",
          audioUrl: "https://drive.google.com/file/d/1C78GtRYGIfN-kTIk7yJhfTp5aaFs_olF/preview",
          duration: 268,
          isEmbed: true
        },
        {
          id: "sad-hindi-2",
          title: "Tum Hi Ho",
          artist: "Arijit Singh",
          albumArt: "https://drive.google.com/uc?export=view&id=1aPUfn6MNZMhGt1wSEPrGFi7Kj8rqlZkv",
          audioUrl: "https://drive.google.com/uc?export=view&id=1wI13QRvvQUOMuTdNf-rC8aw6XVTapxfv",
          duration: 252
        },
        {
          id: "sad-hindi-3",
          title: "Bewafa",
          artist: "Imran Khan",
          albumArt: "https://drive.google.com/uc?export=view&id=1Qe6qgDZCPAME7n0lheAgRY8bHmPH6h2p",
          audioUrl: "https://drive.google.com/uc?export=view&id=1DEmun6MVsTiVvVNcQcORwe6VwKl8WVIT",
          duration: 240
        }
      ]
    },
    english: {
      id: "sad-english",
      name: "Sad English",
      description: "Melancholic English songs for emotional times",
      coverImage: "/images/playlists/sad-english.jpg",
      songs: [
        {
          id: "sad-english-1",
          title: "Someone Like You",
          artist: "Adele",
          albumArt: "https://drive.google.com/uc?export=view&id=1Qy8nPqRS6ZEYsXfriPwBnQDuuFspV7AT",
          audioUrl: "https://drive.google.com/uc?export=view&id=1eC3Pbhb6iUQvyXE_63UR2rSRhObCNxul",
          duration: 285
        },
        {
          id: "sad-english-2",
          title: "Fix You",
          artist: "Coldplay",
          albumArt: "https://drive.google.com/uc?export=view&id=1oNXF5KXUz_x0yHbvk09gUrKOmv0MR0a1",
          audioUrl: "https://drive.google.com/uc?export=view&id=1jvXRdfnJeEKsRRw5c8XNbOhtKoyrKBuI",
          duration: 294
        },
        {
          id: "sad-english-3",
          title: "Hello",
          artist: "Adele",
          albumArt: "https://drive.google.com/uc?export=view&id=1HGNfpKOZdeSdHEcTxmRm5eaX0JDzdJOD",
          audioUrl: "https://drive.google.com/uc?export=view&id=14EXYyFW8BEdjQ_xvjxlJbLV7EZThnpGb",
          duration: 321
        },
        {
          id: "sad-english-4",
          title: "All I Want",
          artist: "Kodaline",
          albumArt: "https://drive.google.com/uc?export=view&id=1Uo2BxUEzK0ccGGjmZjEVK3ziuQNt_DQD",
          audioUrl: "https://drive.google.com/uc?export=view&id=1k7f9nmyBkR0nzKcw9IA53yXEr_yBvyAY",
          duration: 303
        },
        {
          id: "sad-english-5",
          title: "Skinny Love",
          artist: "Birdy",
          albumArt: "https://drive.google.com/uc?export=view&id=1jOPd-z7O2a-nN1dVNRHOYtgtRSCaXxvs",
          audioUrl: "https://drive.google.com/uc?export=view&id=1W6aaA4FLl5VmdMeX5HqsnXLRLZTJFPOe",
          duration: 212
        }
      ]
    },
    mixed: {
      id: "sad-mixed",
      name: "Sad Mix",
      description: "A mixture of sad songs in different languages",
      coverImage: "/images/playlists/sad-mixed.jpg",
      songs: [
        {
          id: "sad-mixed-1",
          title: "Ranjha",
          artist: "B Praak, Jasleen Royal",
          albumArt: "https://drive.google.com/uc?export=view&id=1UXGMAJ2tJpVz6Y9NMnO5lxF9BZCztRAk",
          audioUrl: "https://drive.google.com/uc?export=view&id=1Hzw_bwVdUMRFVyXOVp16q4CkFY8bNBhq",
          duration: 216
        },
        {
          id: "sad-mixed-2",
          title: "All of Me",
          artist: "John Legend",
          albumArt: "https://drive.google.com/uc?export=view&id=1E8mLFj8hzEVJXjpVC-Fy8xODEqc-4C5D",
          audioUrl: "https://drive.google.com/uc?export=view&id=19kT-XWEqFVbF5Q_S_j6QCfFR1IdRRnF7",
          duration: 269
        },
        {
          id: "sad-mixed-3",
          title: "Tose Naina",
          artist: "Arijit Singh",
          albumArt: "https://drive.google.com/uc?export=view&id=1-4cVA6oZ8DTT4H-XJ4Eoh5D0t05vkzAT",
          audioUrl: "https://drive.google.com/uc?export=view&id=1xQvro_zdLQfSlBrsiBZUPtkLZHLQHRSy",
          duration: 289
        }
      ]
    }
  },
  energetic: {
    hindi: {
      id: "energetic-hindi",
      name: "Energetic Hindi",
      description: "High-energy Hindi tracks to pump you up",
      coverImage: "/images/playlists/energetic-hindi.jpg",
      songs: [
        {
          id: "energetic-hindi-1",
          title: "Malhari",
          artist: "Vishal Dadlani",
          albumArt: "https://drive.google.com/uc?export=view&id=1-1CiLdH_rGc1_YO5vL4CwGUrJ3vIMUJ7",
          audioUrl: "https://drive.google.com/uc?export=view&id=1FS17r3-d3iGz9xG8mkVZvGKi5NZBzHTx",
          duration: 209
        },
        {
          id: "energetic-hindi-2",
          title: "Dhoom Machale",
          artist: "Sunidhi Chauhan",
          albumArt: "https://drive.google.com/uc?export=view&id=1nzBgXIL2LhJ6zBVCUPcgVMgOzrspDDY5",
          audioUrl: "https://drive.google.com/uc?export=view&id=1ioDL6ttFXpxCUwOzUhpwzT5xaEaxRaNX",
          duration: 237
        }
      ]
    },
    english: {
      id: "energetic-english",
      name: "Energetic English",
      description: "High-octane English tracks to get you moving",
      coverImage: "/images/playlists/energetic-english.jpg",
      songs: [
        {
          id: "energetic-english-1",
          title: "Eye of the Tiger",
          artist: "Survivor",
          albumArt: "https://drive.google.com/uc?export=view&id=14jvN5GFWcRTJxHblz5qdyBXKzLB_kJ4s",
          audioUrl: "https://drive.google.com/uc?export=view&id=1SYJr3uqX8SXgcAEBsHN0nSO_VAvGVkcX",
          duration: 246
        },
        {
          id: "energetic-english-2",
          title: "Can't Hold Us",
          artist: "Macklemore & Ryan Lewis",
          albumArt: "https://drive.google.com/uc?export=view&id=1Wl_2CxMibCc8ESWU2G5pFXQkgSmkZQHW",
          audioUrl: "https://drive.google.com/uc?export=view&id=1yjGqhV3RMmXXRRUQ1KIL-CX6tpoUFOSo",
          duration: 258
        }
      ]
    },
    mixed: {
      id: "energetic-mixed",
      name: "Energetic Mix",
      description: "A mix of energetic songs in different languages",
      coverImage: "/images/playlists/energetic-mixed.jpg",
      songs: [
        {
          id: "energetic-mixed-1",
          title: "Balam Pichkari",
          artist: "Vishal Dadlani, Shalmali Kholgade",
          albumArt: "https://drive.google.com/uc?export=view&id=1hTtVF1SuEgrgYepIOHWO1zVpT0M2pttQ",
          audioUrl: "https://drive.google.com/uc?export=view&id=12zL1dBCcJOK82A_IWrJnvbcKHiEjofE4",
          duration: 224
        },
        {
          id: "energetic-mixed-2",
          title: "Pump It",
          artist: "Black Eyed Peas",
          albumArt: "https://drive.google.com/uc?export=view&id=1SxnJO4Rtj_V49M4EwCjxC1-QygRmHSRa",
          audioUrl: "https://drive.google.com/uc?export=view&id=1Ku-2pBhoGgrWQfvxE3n4w3xnWB4LnvTw",
          duration: 213
        }
      ]
    }
  },
  focus: {
    hindi: {
      id: "focus-hindi",
      name: "Focus Hindi",
      description: "Calm Hindi music to help you concentrate",
      coverImage: "/images/playlists/focus-hindi.jpg",
      songs: [
        {
          id: "focus-hindi-1",
          title: "Tum Se Hi",
          artist: "Mohit Chauhan",
          albumArt: "https://drive.google.com/uc?export=view&id=1lUixR7Kj0KSKLvQAJr7-Ax1F3ocA-ETv",
          audioUrl: "https://drive.google.com/uc?export=view&id=1aP_aTX-MATJXLmzlN7RHwYDpFNP8qovZ",
          duration: 328
        },
        {
          id: "focus-hindi-2",
          title: "Kun Faya Kun",
          artist: "A.R. Rahman, Javed Ali",
          albumArt: "https://drive.google.com/uc?export=view&id=1QnJP5kHEEJHZwBcfFWhHjwuGxRwAiirS",
          audioUrl: "https://drive.google.com/uc?export=view&id=1_RD2jyQLvHSWUvLvsUZzCPsxHrGbdCDR",
          duration: 457
        }
      ]
    },
    english: {
      id: "focus-english",
      name: "Focus English",
      description: "Instrumental English tracks for deep concentration",
      coverImage: "/images/playlists/focus-english.jpg",
      songs: [
        {
          id: "focus-english-1",
          title: "Experience",
          artist: "Ludovico Einaudi",
          albumArt: "https://drive.google.com/uc?export=view&id=1xDviwR_2AXJ8FVh65kWtSFYLa2eCcEPq",
          audioUrl: "https://drive.google.com/uc?export=view&id=1s16MaGXOJl5hGOpXG9p4C-ecCLCndyZU",
          duration: 315
        },
        {
          id: "focus-english-2",
          title: "Time",
          artist: "Hans Zimmer",
          albumArt: "https://drive.google.com/uc?export=view&id=1AaUrK_pRSzxG_SkW1nuRxG5zTrZMyO-h",
          audioUrl: "https://drive.google.com/uc?export=view&id=1ZQ7GgfHHvNz8BbYKVIbMKpSNzLTlkwXF",
          duration: 275
        }
      ]
    },
    mixed: {
      id: "focus-mixed",
      name: "Focus Mix",
      description: "A mix of focus-enhancing music in different languages",
      coverImage: "/images/playlists/focus-mixed.jpg",
      songs: [
        {
          id: "focus-mixed-1",
          title: "Mantra",
          artist: "Arjun",
          albumArt: "https://drive.google.com/uc?export=view&id=1SY7JvsFInm8SoPWnuIKSEYlF8vGH6y3k",
          audioUrl: "https://drive.google.com/uc?export=view&id=1iF4qyCkZPEOKL0CbgDSdKEZFHkjDdOlL",
          duration: 384
        },
        {
          id: "focus-mixed-2",
          title: "Weightless",
          artist: "Marconi Union",
          albumArt: "https://drive.google.com/uc?export=view&id=1_0RzCfTwVA3JLdTCDuJseLX7fCQ-rYBP",
          audioUrl: "https://drive.google.com/uc?export=view&id=1dwHjPLH-mP06RFb8DqVQGkwxjFaMvKVL",
          duration: 482
        }
      ]
    }
  },
  chill: {
    hindi: {
      id: "chill-hindi",
      name: "Chill Hindi",
      description: "Relaxing Hindi music for unwinding",
      coverImage: "/images/playlists/chill-hindi.jpg",
      songs: [
        {
          id: "chill-hindi-1",
          title: "Tum Ho",
          artist: "Mohit Chauhan",
          albumArt: "https://drive.google.com/uc?export=view&id=19DGQ-mWb0f8XOKujpXgR2WCd0eIpSAkY",
          audioUrl: "https://drive.google.com/uc?export=view&id=1rUdIb9wMTIbTZfvC3iXKEZm18-RMNTvb",
          duration: 303
        },
        {
          id: "chill-hindi-2",
          title: "Pehli Nazar Mein",
          artist: "Atif Aslam",
          albumArt: "https://drive.google.com/uc?export=view&id=1eFnQsKLKOG8a1_oWOZC9dNEvGZjLT77L",
          audioUrl: "https://drive.google.com/uc?export=view&id=1NKMRG3SYPj5FKxovEuTeKlQAyxRJI0xn",
          duration: 326
        }
      ]
    },
    english: {
      id: "chill-english",
      name: "Chill English",
      description: "Laid-back English tracks for relaxation",
      coverImage: "/images/playlists/chill-english.jpg",
      songs: [
        {
          id: "chill-english-1",
          title: "Sunset Lover",
          artist: "Petit Biscuit",
          albumArt: "https://drive.google.com/uc?export=view&id=1qMoJa7yq05iKrBwqHpL37o08JmX4mB_m",
          audioUrl: "https://drive.google.com/uc?export=view&id=1iKWS5J3F-YtSbrcMYDfUcxA-zwbU0T4k",
          duration: 219
        },
        {
          id: "chill-english-2",
          title: "Waves",
          artist: "Chill Beats",
          albumArt: "https://drive.google.com/uc?export=view&id=1zTkm-U0QbQepQAGBtswgCXMjGLtObTji",
          audioUrl: "https://drive.google.com/uc?export=view&id=1WCahrzT2mLEiDHd7xJOJHDTmOblO8-2y",
          duration: 245
        }
      ]
    },
    mixed: {
      id: "chill-mixed",
      name: "Chill Mix",
      description: "A mix of relaxing tunes in different languages",
      coverImage: "/images/playlists/chill-mixed.jpg",
      songs: [
        {
          id: "chill-mixed-1",
          title: "Zara Zara",
          artist: "Bombay Jayashri",
          albumArt: "https://drive.google.com/uc?export=view&id=1XmvpLGkxPUB87UVXBKIWVlxgLeOB3CEc",
          audioUrl: "https://drive.google.com/uc?export=view&id=1KCJM-DafXqrQnuzKHGn3ZyRw-cq8u-VG",
          duration: 302
        },
        {
          id: "chill-mixed-2",
          title: "Midnight City",
          artist: "M83",
          albumArt: "https://drive.google.com/uc?export=view&id=1x_n7NUmCkciC3pAovBjJiVdBXrB6aOMR",
          audioUrl: "https://drive.google.com/uc?export=view&id=1aLFl2O98L6f8AY_cKqUO0Z-cYzrDYQlP",
          duration: 244
        }
      ]
    }
  },
  motivational: {
    hindi: {
      id: "motivational-hindi",
      name: "Motivational Hindi",
      description: "Inspiring Hindi songs to boost your spirit",
      coverImage: "/images/playlists/motivational-hindi.jpg",
      songs: [
        {
          id: "motivational-hindi-1",
          title: "Zinda",
          artist: "Amit Trivedi",
          albumArt: "https://drive.google.com/uc?export=view&id=1iAjbh13C-K_6JULJlLRZpHgP-UbAR5Nw",
          audioUrl: "https://drive.google.com/uc?export=view&id=1gA2w8QUiLBhBWFmkBP_WzMwWm3w9IEvd",
          duration: 258
        },
        {
          id: "motivational-hindi-2",
          title: "Chak De India",
          artist: "Sukhwinder Singh",
          albumArt: "https://drive.google.com/uc?export=view&id=1WNUTsMSQtVl3A-cUBfFqU4nQbMYo1mTQ",
          audioUrl: "https://drive.google.com/uc?export=view&id=18WtHYBsCIKIDZ_Y2XorRs0Wb9KHbO1YP",
          duration: 254
        }
      ]
    },
    english: {
      id: "motivational-english",
      name: "Motivational English",
      description: "Inspiring English tracks to keep you motivated",
      coverImage: "/images/playlists/motivational-english.jpg",
      songs: [
        {
          id: "motivational-english-1",
          title: "Hall of Fame",
          artist: "The Script ft. will.i.am",
          albumArt: "https://drive.google.com/uc?export=view&id=1wZxMkVvfZ2A0LS_IgW0PRzBwV5vDNyKg",
          audioUrl: "https://drive.google.com/uc?export=view&id=1JZYDmGcvDwQX_xFEBnp4wZzKaYq-7K7Y",
          duration: 202
        },
        {
          id: "motivational-english-2",
          title: "Believer",
          artist: "Imagine Dragons",
          albumArt: "https://drive.google.com/uc?export=view&id=1tyjcP2GIs1sRKhRlsv7w2qXolUPQ9wdV",
          audioUrl: "https://drive.google.com/uc?export=view&id=1aLFl2O98L6f8AY_cKqUO0Z-cYzrDYQlP",
          duration: 204
        }
      ]
    },
    mixed: {
      id: "motivational-mixed",
      name: "Motivational Mix",
      description: "A mix of motivational songs in different languages",
      coverImage: "/images/playlists/motivational-mixed.jpg",
      songs: [
        {
          id: "motivational-mixed-1",
          title: "Kar Har Maidaan Fateh",
          artist: "Sukhwinder Singh, Shreya Ghoshal",
          albumArt: "https://drive.google.com/uc?export=view&id=1xHlCF9bH3RsBVKtGxgYU2UIOPl-Fs-Vn",
          audioUrl: "https://drive.google.com/uc?export=view&id=1_IIJO6LQmRMjEHHzNHGpKFC1oFPL3Xjz",
          duration: 328
        },
        {
          id: "motivational-mixed-2",
          title: "Titanium",
          artist: "David Guetta ft. Sia",
          albumArt: "https://drive.google.com/uc?export=view&id=1oXv4jUAwLEBEOL2zYdHdnwwctSuaXvsZ",
          audioUrl: "https://drive.google.com/uc?export=view&id=1xqPu1VjgcKRdUqkR2BEBo4lNX1t1j9x_",
          duration: 245
        }
      ]
    }
  }
};
