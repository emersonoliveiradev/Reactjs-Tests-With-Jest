import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
/*export * from '@testing-library/react'*/

import { addTech } from '~/store/modules/techs/actions'
import TechList from '~/components/TechList/index'

jest.mock("react-redux");

describe('TechList component', () => {

  /*beforeEach(() => {
    localStorage.clear();
  });
  it("should be able to add new tech", () => {
    const { getByText, getByTestId, getByLabelText, debug } = render(
      <TechList />
    );
    fireEvent.change(getByLabelText("Tech"), { target: { value: "Node.js" } });
    fireEvent.submit(getByTestId("tech-form"));
    expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
    expect(getByLabelText("Tech")).toHaveValue("");
  });
  it("should store techs in storage", () => {
    let { getByText, getByTestId, getByLabelText, debug } = render(
      <TechList />
    );
    fireEvent.change(getByLabelText("Tech"), { target: { value: "Node.js" } });
    fireEvent.submit(getByTestId("tech-form"));
    cleanup();
    ({ getByText, getByTestId, getByLabelText, debug } = render(<TechList />));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "techs",
      JSON.stringify(["Node.js"])
    );
    expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
  }); */



  it('Se dado o estado do redux, estão sendo renderizados na lista', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'React.js']
    }));

    const { getByTestId, getByText } = render(<TechList />);
    
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'))
    expect(getByTestId('tech-list')).toContainElement(getByText('React.js'))    
  })

  it('Se o usuário consegue adicionar novas tecnologias - diparando a dispatch..', () => {
    const { getByTestId, getByLabelText } = render(<TechList />);

    const dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)

    fireEvent.change(getByLabelText('Tech'), {target: {value: 'Node.js'}})
    fireEvent.submit(getByTestId('tech-form'))  
    
    expect(dispatch).toHaveBeenCalled()
    /*expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_TECH',
      payload: { tech: 'Node.js'}
    })*/

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'))
    
  })
});