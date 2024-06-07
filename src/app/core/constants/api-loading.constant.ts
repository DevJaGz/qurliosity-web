export const API_REQUEST_AVOID_LOADING: {
  methods: string[];
  regex: string;
}[] = [
  {
    methods: ['POST', 'PUT'],
    regex: '^(.*/)templates/.*/prompts(/.*)?$',
  },
] as const;
