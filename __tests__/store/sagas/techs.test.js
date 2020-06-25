import { runSaga } from 'redux-saga'
import MockAdapter from 'axios-mock-adapter'
import api from '~/services/api'

import { getTechsSuccess, getTechsFailure } from '~/store/modules/techs/actions'
import { getTechs } from '~/store/modules/techs/saga'

const apiMock = new MockAdapter(api)

describe('Techs saga', () => {
  it('Ser possível fazer o fetch das tecnologias', async () => {
    const dispatch = jest.fn();

    apiMock.onGet('techs').reply(200, ['Node.js'])
    await runSaga({ dispatch }, getTechs).toPromise();

    expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(['Node.js']));
  }) 

  it('Deve retornar uma falha', async () => {
    const dispatch = jest.fn()  

    apiMock.onGet('techs').reply(500)
    await runSaga({dispatch}, getTechs).toPromise()

    expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
  })
})