import * as React from "react";

const mockResponse = {
  data: [{
      barn: 'Old Barn',
      barnSection: 'Wood Floor',
      horses: [{
        name: 'Kai',
        stall: 'Stall 1',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 2,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }, {
        name: 'Tiger',
        stall: 'Stall 2',
        picturePath: '',
        feed: [{
          type: 'PELLETS',
          amount: 1,
          unit: 'SCOOP'
        }, {
          type: 'FIBREMAX',
          amount: 0.5,
          unit: 'SCOOP'
        }],
        specialInstructions: ''
      }]
  }],
  metadata: {}
}

export default function BarnSection() {
  // TODO: This will eventually be hooked up to useSWR like this:
  // const { data, error } = useSWR<HealthResponse, Error>("/api/health", fetcher);
  const data = mockResponse.data;
  const error = null;

}
