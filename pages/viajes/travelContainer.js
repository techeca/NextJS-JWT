import React, { useState } from 'react'
import TravelPresenter from './travelPresenter'
import { useRouter } from 'next/router'

export default class extends React.Component {
  state = {
    viajeResult: null,
    error: null,
    loading: true,
    router: null,
  };

  async componentDidMount(){
    try {
      const {data: viajeResult} = await fetch('api/userLogin');
      this.setState({
        viajeResult,
      });
      const rout = useRouter();
      this.setState({
        router,
      });
    } catch (e) {
      this.setState({
        error: 'No se ha encontrada nada',
      });
    } finally {
      this.setState({
        loading:false,
      });
    }
  }

  render(){
      const {viajeResult, error, loading, router} = this.state;

      return(
        <TravelPresenter viajeResult={viajeResult} error={error} loading={loading} router={router} />
      );
  }

}
