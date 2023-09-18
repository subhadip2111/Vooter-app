import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  polls: [], // An array to store poll data
};

const pollSlice = createSlice({
  name: "poll",
  initialState,
  reducers: {
    setPolls: (state, action) => {
      state.polls = action.payload;
      
    },
    addPoll: (state, action) => {
      state.polls.push(action.payload);
    },
    votePoll: (state, action) => {
      const { pollId, optionIndex } = action.payload;
      const poll = state.polls.find((p) => p._id === pollId);

      if (poll) {
        const option = poll.options[optionIndex];
        if (option) {
          option.votes += 1;
        }
      }
    },
  },
});

export const { setPolls, addPoll, votePoll } = pollSlice.actions;

export default pollSlice.reducer;
// pollSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   question: '',
//   options: [],
//   isLoading: false,
//   error: null,
// };

// const pollSlice = createSlice({
//   name: 'poll',
//   initialState,
//   reducers: {
//     setQuestion: (state, action) => {
//       state.question = action.payload;
//     },
//     setOptions: (state, action) => {
//       state.options = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     resetPoll: (state) => initialState,
//   },
// });

// export const {
//   setQuestion,
//   setOptions,
//   setLoading,
//   setError,
//   resetPoll,
// } = pollSlice.actions;

// export default pollSlice.reducer;
