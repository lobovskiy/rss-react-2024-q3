import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PeopleResponse } from './types';
import { Person } from '../types';
import { removeEmptyParams } from './utils';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPeople: builder.query<PeopleResponse, Record<string, unknown>>({
      query: (arg) => ({
        url: `people`,
        params: removeEmptyParams(arg),
      }),
    }),
    getPersonById: builder.query<Person, number>({
      query: (id) => ({
        url: `people/${id}`,
      }),
    }),
  }),
});

export const { useGetPeopleQuery, useGetPersonByIdQuery } = api;
