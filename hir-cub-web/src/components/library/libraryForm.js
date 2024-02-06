import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  SuggestionStatus,
  programsAndServices as hardcodedProgramsAndServices,
  questions as hardcodedQuestions,
  canadianProvincesList,
} from '~/consts';
import useAppState, { useAppDispatch } from '~/appState';
import {
  setQuestions,
  setUserSuggestions,
  setProgramsAndServices,
  updateSuggestion,
  updateProgram,
} from '~/actions/library';
import {
  useGetUserSuggestionsFetchOnce,
  useSetSuggestionStatusRequest,
} from '~/hooks/requests';
import {
  getProgramAndServiceCategoriesRequest,
  getProgramAndServiceRequest,
} from '~/requests/library';

import Accordion from '../ui/accordion';
import { Suggestions } from '~/components/library';
import { Form } from 'react-final-form';
import Select from 'react-select';
import './styles.scss';
import ProgramServiceItem from '../shared/programServiceItem';
import Loader from '../Loader';
import HelpBox from '../HelpBox';

function LibraryForm() {
  const {
    library: { userSuggestions, programsAndServices },
    global: { postalCode },
  } = useAppState();
  const [categoryList, setCategoryList] = useState([]);
  const [programServices, setProgramServices] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const initialProgramAndServiceBody = {
    site: 4,
    category: '',
    location: '',
    postalCode: postalCode || '',
    radius: 100,
  };

  useEffect(() => {
    dispatch(setQuestions(hardcodedQuestions));
    dispatch(
      setProgramsAndServices(
        hardcodedProgramsAndServices.map((e) => ({ ...e, status: 1 }))
      )
    );
    // eslint-disable-next-line
  }, []);
  const [_fetchSuggestionsErrors] = useGetUserSuggestionsFetchOnce(
    (userSuggestions) => dispatch(setUserSuggestions(userSuggestions))
  );
  const stepRef = useRef();
  useEffect(() => {
    window.scrollTo(0, stepRef.current.offsetTop);
  }, []);

  const getCategories = (request) => {
    setLoading(true);
    getProgramAndServiceCategoriesRequest(request)
      .then((res) => {
        setLoading(false);

        if (!res) {
          setCategoryList([]);
          return;
        }

        setCategoryList(res);
      })
      .catch((err) => {
        console.error('err', err);
        setCategoryList([]);
        setLoading(false);
      });
  };

  const getProgramAndService = (request) => {
    setLoading(true);
    getProgramAndServiceRequest(request)
      .then((res) => {
        setLoading(false);

        if (!res) {
          setProgramServices([]);
          return;
        }

        setProgramServices(res);
      })
      .catch((err) => {
        console.error('err', err);
        setProgramServices([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories({
      site: 4,
    });
    getProgramAndService(initialProgramAndServiceBody);
  }, []);

  const { newSuggestions, favoriteSuggestions, archivedSuggestions } =
    useMemo(() => {
      if (!userSuggestions) {
        return {};
      }
      const newSuggestions = userSuggestions.filter(
        (s) => s.status === SuggestionStatus.New
      );
      const favoriteSuggestions = userSuggestions.filter(
        (s) => s.status === SuggestionStatus.Favorite
      );
      const archivedSuggestions = userSuggestions.filter(
        (s) => s.status === SuggestionStatus.Archived
      );
      return { newSuggestions, favoriteSuggestions, archivedSuggestions };
    }, [userSuggestions]);
  const { favoriteProgramsAndServices, archivedProgramsAndServices } =
    useMemo(() => {
      if (!programsAndServices) {
        return {};
      }
      const newProgramsAndServices = programsAndServices.filter(
        (ps) => ps.status === SuggestionStatus.New
      );
      const favoriteProgramsAndServices = programsAndServices.filter(
        (ps) => ps.status === SuggestionStatus.Favorite
      );
      const archivedProgramsAndServices = programsAndServices.filter(
        (ps) => ps.status === SuggestionStatus.Archived
      );
      return {
        newProgramsAndServices,
        favoriteProgramsAndServices,
        archivedProgramsAndServices,
      };
    }, [programsAndServices]);
  const { sendRequest: sendSetSuggestionStateRequest } =
    useSetSuggestionStatusRequest(handleChangeStatusSuccess);
  function handleChangeStatusSuccess(res, id, status) {
    dispatch(updateSuggestion(id, status));
  }
  function handleUpdateProgram(id, status) {
    dispatch(updateProgram(id, status));
  }

  const [tagsList] = useState([]);
  const [tag, setTag] = useState([]);
  const changeTag = (value) => {
    setTag(value);
  };

  const [selectedLocation, setSelectedLocation] = useState([]);
  const changeLocation = (value) => {
    setSelectedLocation(value);
  };

  const [selectedCategory, setSelectedCategory] = useState([]);
  const changeCategory = (value) => {
    setSelectedCategory(value);
  };

  const handleSubmit = () => {
    const updatedBody = Object.assign({}, initialProgramAndServiceBody);
    getProgramAndService({
      ...updatedBody,
      category: selectedCategory.value || '',
      location: selectedLocation.value || '',
    });
  };

  const handleReset = () => {
    setSelectedCategory([]);
    setSelectedLocation([]);
    getProgramAndService(initialProgramAndServiceBody);
  };

  return (
    <div className="library-form">
      <div className="container" ref={stepRef}>
        <div className="library-wrapper">
          <div className="library-title">
            <h2>My Library</h2>
            <div className="help-tip">
              <HelpBox
                firstLine="Not seeing any resources? Want to learn how to search for additional programs/services? Find answers here"
                hash="/help#library"
              />
            </div>
          </div>

          <div>
            <div className="pt-10">
              The library will provide to a wealth of information intended to
              help you
            </div>

            <hr className="horizontal-line" />

            <div className="flex flex-wrap row-mx-15">
              <div className="lg-w-1-2 w-full px-15">
                <div className="legend-informtation-list mb-10 ml-10">
                  <div className="flex items-center flex-wrap row-mx-15">
                    <div className="sm-w-auto w-full pr-0 font-semibold text-sm">
                      Legend
                    </div>
                    <ul className="flex flex-wrap list-reset px-15">
                      <li className="flex items-center item-type-webpage px-10 text-sm">
                        Webpage
                      </li>
                      <li className="flex items-center item-type-video px-10 text-sm">
                        Video
                      </li>
                      <li className="flex items-center item-type-favourite px-10 text-sm">
                        Favourite
                      </li>
                      <li className="flex items-center item-type-archive px-10 text-sm">
                        Archive
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg-w-1-2 w-full px-15">
                <div className="legend-category">
                  <p className="mr-10 text-sm">Sort entries by:</p>
                  <Select
                    isClearable
                    name="tag"
                    options={tagsList}
                    value={tag}
                    placeholder="Category"
                    onChange={changeTag}
                    className="filter-multi-select mt-0 mb-0"
                    classNamePrefix="select"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap row-mx-15">
              <div className="lg-w-1-2 w-full px-15">
                <Suggestions
                  type={SuggestionStatus.New}
                  title="New Resources for You"
                  userSuggestions={newSuggestions}
                  setSuggestionStatus={sendSetSuggestionStateRequest}
                />
              </div>
              <div className="lg-w-1-2 w-full px-15 d-flex">
                <i class="fas fa-star"></i>
                <Suggestions
                  type={SuggestionStatus.Favorite}
                  title="My Favourites"
                  userSuggestions={favoriteSuggestions}
                  programs={favoriteProgramsAndServices}
                  setSuggestionStatus={sendSetSuggestionStateRequest}
                  setProgramStatus={handleUpdateProgram}
                />
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="flex flex-wrap row-mx-15">
              <div className="w-full px-15">
                <Suggestions
                  type={SuggestionStatus.Archived}
                  title="Archive"
                  userSuggestions={archivedSuggestions}
                  programs={archivedProgramsAndServices}
                  setSuggestionStatus={sendSetSuggestionStateRequest}
                  setProgramStatus={handleUpdateProgram}
                  useCollapse={true}
                />
                {/* <div className="page-md-panel-group">
                  <QuestionsList items={questions} />
                </div> */}
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="flex flex-wrap row-mx-15 relative">
              <div className="program-service w-full px-15">
                <div className="programs-and-services-list">
                  <div className="page-panel-group-title">
                    Programs & Services
                  </div>

                  <div className="program-service__form">
                    <Form onSubmit={handleSubmit} initialValues={{}}>
                      {({ handleSubmit, submitting, touched, errors }) => (
                        <form
                          onSubmit={handleSubmit}
                          className="program-services-form"
                        >
                          <div className="input-block__wrapp">
                            <div className="input-block">
                              <Select
                                name="selectedCategory"
                                options={categoryList.map((item) => ({
                                  value: item,
                                  label: item,
                                }))}
                                value={selectedCategory}
                                onChange={changeCategory}
                                className="program-category"
                                classNamePrefix="select"
                                isSearchable={false}
                                placeholder="Select Category"
                              />
                            </div>
                            <span className="form-separator">In</span>

                            <Select
                              name="selectedLocation"
                              options={canadianProvincesList}
                              value={selectedLocation}
                              onChange={changeLocation}
                              className="program-location"
                              classNamePrefix="select"
                              isSearchable={false}
                              placeholder="Select Location"
                            />

                            <div className="input-block">
                              <button
                                id="submit"
                                type="submit"
                                className="form-submit program-search"
                              >
                                Search
                                <i className="fas fa-angle-right"></i>
                              </button>
                            </div>
                          </div>
                          <div className="input-block">
                            <button
                              id="reset"
                              type="button"
                              className="program-reset"
                              onClick={handleReset}
                            >
                              Reset
                            </button>
                          </div>
                        </form>
                      )}
                    </Form>
                  </div>
                  <div className="page-panel-group-description mt-10">
                    This is a list of programs and services within 100km radius
                    of you that you may find useful.
                  </div>
                  <div className="page-panel-explain mb-20">
                    Click on one of the listings below and you will get their
                    full details
                  </div>
                  <hr />

                  {categoryList[0] && programServices[0] ? (
                    categoryList.map((category) => {
                      const programServicesByCategory = programServices.filter(
                        (program) => program.category === category
                      );

                      if (!programServicesByCategory.length) {
                        return (
                          <Accordion title={category}>
                            <p className="category-notification">No Results Found</p>
                          </Accordion>
                        );
                      }

                      const subCategory = programServicesByCategory[0].subCategory;

                      return (
                        <Accordion title={category} subCategory={subCategory}>
                          {programServicesByCategory.map((program) => {
                            return (
                              <ProgramServiceItem
                                key={program.id}
                                program={program}
                              />
                            );
                          })}
                        </Accordion>
                      );
                    })
                  ) : (
                    <p className="text-center mt-30 mb-0">No Results Found</p>
                  )}

                  {isLoading && <Loader />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryForm;
