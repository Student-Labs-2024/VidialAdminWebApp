import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import serviceStore from 'stores/ServiceStore';
import ServiceCommonContent from './ServiceCommonContent';
import Toast from 'components/Toast';
import ServiceDataCardProps from 'types/Service/ServiceDataCardProps';

const useFilteredServices = (tag: string) => {
  const [filteredServices, setFilteredServices] = useState<
    ServiceDataCardProps[]
  >([]);

  useEffect(() => {
    serviceStore.loadServices();
  }, []);

  useEffect(() => {
    setFilteredServices(
      serviceStore.services.filter((service) => service.tag === tag),
    );
  }, [tag]);

  return filteredServices;
};

const ServiceHardwareTreatmentContent = () => {
  const location = useLocation();
  const tag = location.pathname.split('/').pop()!;
  const filteredServices = useFilteredServices(tag);

  return (
    <>
      <ServiceCommonContent servicesCommon={filteredServices} />
      <Toast />
    </>
  );
};

export default observer(ServiceHardwareTreatmentContent);
