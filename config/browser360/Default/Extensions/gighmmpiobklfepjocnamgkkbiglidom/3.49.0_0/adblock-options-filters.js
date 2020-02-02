// Remove class that applies a border-bottom line to the last
// filter list element for each section
// Input:
//   section:string -- should be 'all' (apply to all 3 sections), 'other_filters'
//                     'ads_and_languages' or 'custom_filters'
var removeBottomLine = function(section) {
  let classToRemove = 'bottom-line';

  if (section === 'all' || section === 'ads_and_languages') {
    let $adBlockingFilters = $('#ad_blocking_list > div:visible');
    let $languageFilters = $('#language_list > div:visible');
    let $sectionFilters = $adBlockingFilters.add($languageFilters);
    $sectionFilters.addClass(classToRemove).last().removeClass(classToRemove);
  }

  if (section === 'all' || section === 'other_filters') {
    let $otherFilters = $('#other_filter_lists > div:visible');
    $otherFilters.addClass(classToRemove).last().removeClass(classToRemove);
  }

  if (section === 'all' || section === 'custom_filters') {
    let $customFilters = $('#custom_filter_lists > div:visible');
    $customFilters.addClass(classToRemove).last().removeClass(classToRemove);
  }
}

// Represents the checkbox controlling subscription to a specific filter list,
// as well as the UI that goes along with it (e.g. status label and removal link.)
// Inputs:
//   filter_list:object - An entry from a filterListSections array.
//   filterListType:string - A key from filterListSections describing the section
//       where this checkbox will appear, e.g. 'languageFilterList'.
//   index:int - The position in the section where this checkbox should appear.
//   container:jQuery - The DOM element for the section in which this checkbox
//       should appear.
function CheckboxForFilterList(filterList, filterListType, index, container) {
  this._container  = container;
  this._filterList = filterList;
  var id           = filterListType + '_' + index;
  var filterId     = this._filterList.id;
  var filterListIcon = $('<i></i>')
    .addClass('material-icons')
    .addClass('md-24')
    .text('format_list_bulleted');

  this._div = $('<div></div>').addClass('section-padding').addClass('bottom-line').addClass('filter-subscription-wrapper')
                  .css('display', filterListType === 'language_filter_list' ? (filterList.subscribed ? 'block' : 'none') : 'block');

  this._checkBox = $('<input />').attr('type', 'checkbox')
              .attr('id', id)
              .prop('checked', filterList.subscribed ? true : null)
              .addClass('filter_list_control');
  this._checkBoxIcons = $('\
    <i class="unchecked material-icons">lens</i>\
    <i class="checked material-icons circle-icon-bg-24 checkbox-icon">check_circle</i>'
  )
  this._checkBoxWrapper = $('<span></span>')
              .addClass('checkbox')
              .addClass('md-stack')
              .append(this._checkBox)
              .append(this._checkBoxIcons)

  this._label = $('<label></label>')
  .text(filterList.label || filterList.title || filterList.url.substr(0,40)+'...')
  .attr('title', filterList.url)
  .attr('for', id)
  .append(this._link);

  this._link = $('<a></a>').addClass('filter-list-link')
            .css('display', $('#btnShowLinks')
            .prop('disabled') ? 'inline' : 'none')
            .attr('target', '_blank')
            .attr('data-URL', filterList.url)
            .append(filterListIcon)
            .click(function (e)
              {
              var url = $(this).attr('data-URL');
              $(this).attr('href', url);
            });

  this._infospan = $('<span></span>')
      .addClass('subscription_info')
      .addClass('light-grey-text')
      .text(filterList.subscribed && !filterList.lastDownload ? (translate('fetchinglabel')) : '');

  this._removeFilterListLabel = filterList.user_submitted ? $('<a>')
                                          .css('font-size', '10px')
                                          .css('display', filterList.subscribed ? 'none' : 'inline')
                                          .attr('href', '#')
                                          .addClass('remove_filterList').
                                          text(translate('removefromlist'))
                                          .click(function (event)
                                          {
                                            event.preventDefault();
                                            var $subscription = $(this).closest('.subscription');
                                            var $subscriptionWrapper = $subscription.closest('.filter-subscription-wrapper');
                                            var subscriptionId = $subscription.attr('name');
                                            SubscriptionUtil.unsubscribe(subscriptionId, filterList, true);
                                            $subscriptionWrapper.remove();
                                            removeBottomLine('custom_filters');
                                          }) : null;

  this._checkboxAndLabel = $('<div></div>')
                              .addClass('label-max-width')
                              .append(this._checkBoxWrapper)
                              .append(this._label)
                              .append(this._link)

  this._extraInformations = $('<div></div>')
                              .append(this._infospan)
                              .append(this._removeFilterListLabel)

  this._checkboxHeaderLine = $('<div></div>')
                              .append(this._checkboxAndLabel)
                              .append(this._extraInformations)
                              .addClass('subscription')
                              .addClass(filterListType)
                              .addClass('add-space-between')
                              .addClass('checkbox-indentation')
                              .attr('name', filterList.id)
  
  this._extraInformation = $('<div></div>').addClass('extra-info').addClass('italic')
                              .text(translate('filter_'+filterId+'_explained'));
}

CheckboxForFilterList.prototype = {
  // Bind checkbox on change event to handle subscribing and unsubscribing to
  // different filter lists.

  _bindActions: function () {
    this._checkBox.change(function () {
      var $subscription  = $(this).closest('.subscription');
      var $subscriptionWrapper = $subscription.closest('.filter-subscription-wrapper');
      var checked = $(this).is(':checked');
      var id = $subscription.attr('name');

      if (checked) {
        if (!SubscriptionUtil.validateOverSubscription()) {
          $(this).prop('checked', false);
          return;
        }
        $('.subscription_info', $subscription).text(translate('fetchinglabel'));
        SubscriptionUtil.subscribe(id);
        FilterListUtil.cachedSubscriptions[id].subscribed = true;
      } else {
        if (!SubscriptionUtil.validateUnderSubscription()) {
          $(this).prop('checked', true);
          return;
        }
        SubscriptionUtil.unsubscribe(id, false);
        $('.subscription_info', $subscription).text(translate('unsubscribedlabel'));
        FilterListUtil.cachedSubscriptions[id].subscribed    = false;
        FilterListUtil.cachedSubscriptions[id].lastDownload  = -1;
        FilterListUtil.cachedSubscriptions[id]._lastDownload = -1;
      }
      $('.remove_filterList', $subscription).css('display', checked ? 'none' : 'inline');

      if ($subscription.attr('class').indexOf('language_filter_list') > -1) {
        $subscriptionWrapper.toggle({
          duration: 500,
          start: function() {
            $(this).closest('.filter-subscription-wrapper').removeClass('bottom-line');
          },
          complete: function() {
            removeBottomLine('ads_and_languages');
          }
        });
        if (!checked) {
          var $this = $(this);
          var index = $this.attr('id').split('_')[3];
          var entry = filterListSections.language_filter_list.array[index];
          if (!entry.hasOwnProperty('label')) {
            entry.label = translateIDs(id);
          }

          var option = new OptionForFilterList(entry, index);
          LanguageSelectUtil.insertOption(option.get(), index);
        }
      }
    });

    if (this._filterList.user_submitted) {
      this._removeFilterListLabel.click(function (event) {
        event.preventDefault();
        var parent = $(this).parent().parent();
        var id     = parent.attr('name');
        SubscriptionUtil.unsubscribe(id, parent._filterList, true);
        parent.remove();
      });
    }

  },

  // Create the actual check box div and append in the container.
  // Inputs:
  //   isChecked:boolean - Flag that will indicate that this checkbox is checked by default.
  createCheckbox: function (isChecked) {
    this._div.append(this._checkboxHeaderLine).append(this._extraInformation);

    this._container.append(this._div);
    this._bindActions();

    if (isChecked) {
      this._checkBox.prop('checked', true);
      this._checkBox.trigger('change');
    }
  },
}

// Represents the option for language filter lists inside the language select.
// Inputs:
//   filterList:object - An entry from a filterListSections array.
//   index:int - The position in the language select where this option should appear.
function OptionForFilterList(filterList, index) {
  this._option = $('<option>', {
    value: filterList.id,
    text: filterList.label || filterList.title,
    hidden: filterList.hidden,
  }).data('index', index);
}

OptionForFilterList.prototype = {
  // Returns the _option attribute.
  get: function () {
    return this._option;
  },
}

// Contains all filter lists and their respective containers.
var filterListSections = {
  adblock_filter_list: {
    array: [],
    $container: $('#ad_blocking_list'),
  },
  language_filter_list: {
    array: [],
    $container: $('#language_list'),
  },
  other_filter_list: {
    array: [],
    $container: $('#other_filter_lists'),
  },
  custom_filter_list: {
    array: [],
    $container: $('#custom_filter_lists'),
  },
}

// This class is in charge of creating the display per filter list type.
// Inputs:
//   filterListSection:object - One of the objects in filterListSections.
//   filterListType:string - Will serve as the identifier for the corresponding filter list,
//      use the keys in filterListSections as its value.
function SectionHandler(filterListSection, filterListType) {
  this._cachedSubscriptions = filterListSection.array;
  this._$section             = filterListSection.$container;
  this._filterList_type     = filterListType;
}

SectionHandler.prototype = {
  // Organize each container for checkboxes.
  _organize: function () {
    for (var i = 0; i < this._cachedSubscriptions.length; i++) {
      var filterList = this._cachedSubscriptions[i];
      var checkbox   = new CheckboxForFilterList(filterList, this._filterList_type, i, this._$section);
      checkbox.createCheckbox();
    }
  },

  // Initialization call. Calls _organize to start displaying things.
  initSection: function ()
  {
    this._organize();
  },
};

// Utility class for filter lists.
function FilterListUtil() {
}

FilterListUtil.sortFilterListArrays = function () {
  for (var filterList in filterListSections) {
    filterListSections[filterList].array.sort(function (a, b) {
      return a.label > b.label ? 1 : (a.label === b.label ? 0 : -1);
    });
  }
}

// Prepare filterListSections.
// Inputs:
//    subs:object - Map for subscription lists taken from the background.
FilterListUtil.getFilterListType = function (filterList) {
  var filterListType = '';
  if (filterList.id === 'adblock_custom' ||
      filterList.id === 'easylist' ||
      filterList.id === 'anticircumvent' ||
      filterList.id === 'acceptable_ads') {
    filterListType = 'adblock_filter_list';
  } else if (filterList.id === 'easyprivacy' ||
             filterList.id === 'antisocial' ||
             filterList.id === 'malware' ||
             filterList.id === 'annoyances' ||
             filterList.id === 'bitcoin_mining_protection' ||
             filterList.id === 'warning_removal') {
    filterListType = 'other_filter_list';
  } else if (filterList.language === true) {
    filterListType = 'language_filter_list';
  } else {
    filterListType = 'custom_filter_list';
  }
  return filterListType;
}

FilterListUtil.prepareSubscriptions = function (subs) {

  FilterListUtil.cachedSubscriptions = subs;
  for (var id in subs) {
    if (!id) {
      continue;
    }

    var entry          = subs[id];
    entry.label        = translateIDs(id);
    entry.id           = id;
    var filterListType = FilterListUtil.getFilterListType(entry);
    filterListSections[filterListType].array.push(entry);
  }

  FilterListUtil.sortFilterListArrays();
}

// Returns the subscription info object for the custom filter list specified by |url|,
// or undefined if that custom filter list does not exist.
// Inputs:
//   url:string - Url for uploaded custom filter list.
FilterListUtil.checkUrlForExistingFilterList = function (url)
{
  var cachedSubscriptions = FilterListUtil.cachedSubscriptions;
  for (var id in cachedSubscriptions)
  {
    if (url === cachedSubscriptions[id].url)
    {
      return cachedSubscriptions[id];
    }
  }
};

// Updates info text for each filter list.
FilterListUtil.updateSubscriptionInfoAll = function () {
  var cachedSubscriptions = FilterListUtil.cachedSubscriptions;
  for (var id in cachedSubscriptions) {
    FilterListUtil.updateSubscriptionInfoForId(id);
  }
}

// Updates info text for a specific filter list.
FilterListUtil.updateSubscriptionInfoForId = function (id) {
  var $div = $('[name=\'' + id + '\']');
  var subscription = FilterListUtil.cachedSubscriptions[id];
  if (subscription.subscribed === false) {
    return;
  }

  var $infoLabel   = $('.subscription_info', $div);
  var text        = $infoLabel.text();
  var lastUpdate = subscription.lastDownload || subscription._lastDownload;
  // If filter list is invalid, skip it.
  if ($infoLabel.text() === translate('invalidListUrl')) {
    return;
  }
  if (Synchronizer.isExecuting(subscription.url)) {
    text = translate('fetchinglabel');
  } else if (subscription.downloadStatus && subscription.downloadStatus != 'synchronize_ok') {
    var map = {
      synchronize_invalid_url: translate('ab_filters_subscription_lastDownload_invalidURL'),
      synchronize_connection_error: translate('ab_filters_subscription_lastDownload_connectionError'),
      synchronize_invalid_data: translate('ab_filters_subscription_lastDownload_invalidData'),
      synchronize_checksum_mismatch: translate('ab_filters_subscription_lastDownload_checksumMismatch'),
    };
    if (subscription.downloadStatus in map) {
      text = map[subscription.downloadStatus];
    } else {
      text = subscription.downloadStatus;
    }
  } else if (lastUpdate > 0) {
    var howLongAgo = Date.now() - (lastUpdate * 1000);
    var seconds      = Math.round(howLongAgo / 1000);
    var minutes      = Math.round(seconds / 60);
    var hours        = Math.round(minutes / 60);
    var days         = Math.round(hours / 24);
    text         = '';
    if (seconds < 10) {
      text += translate('updatedrightnow');
    } else if (seconds < 60) {
      text += translate('updatedsecondsago', [seconds]);
    } else if (minutes === 1) {
      text += translate('updatedminuteago');
    } else if (minutes < 60) {
      text += translate('updatedminutesago', [minutes]);
    } else if (hours === 1) {
      text += translate('updatedhourago');
    } else if (hours < 24) {
      text += translate('updatedhoursago', [hours]);
    } else if (days === 1) {
      text += translate('updateddayago');
    } else {
      text += translate('updateddaysago', [days]);
    }
  }

  $infoLabel.text(text);
}

// Update checkbox for the filter list according to it's current state.
// Inputs:
//    filterList:object - Filter list that owns the check box to be updated.
//    id:String - Id of the filter list to be updated, also the name of the containing div in display.
FilterListUtil.updateCheckbox = function (filterList, id) {
  var $containingDiv = $('div[name=\'' + id + '\']');
  var checkbox      = $($containingDiv).find('input');

  // Check if subscribed and checkbox staus is equal, if not, update checkbox status according to subscribed status.
  if (checkbox.is(':checked') !== filterList.subscribed) {
    checkbox.prop('checked', filterList.subscribed ? true : null);

    // Force update current info label since status is already updated in the background.
    $('.subscription_info', $containingDiv).text(filterList.subscribed ? translate('fetchinglabel') : translate('unsubscribedlabel'));
  }
}

// Utility class for the language select.
function LanguageSelectUtil() {
}

// Insert option at specified index in the language select.
// Inputs:
//   option:OptionForFilterList - Option to be inserted.
//   index:int - Where to insert the option.
LanguageSelectUtil.insertOption = function (option, index) {
  var $languageSelect = $('#language_select');
  var options         = $languageSelect.find('option');
  var i;
  for (i = 0; i < options.length; i++) {
    var listOptionIndex = options.eq(i).data('index');
    if (listOptionIndex && parseInt(listOptionIndex) > parseInt(index)) {
      break;
    }
  }

  if (options.eq(i).length > 0) {
    options.eq(i).before(option);
  } else {
    $languageSelect.append(option);
  }
}

// Puts all unsubscribed language filter lists into the language select,
// and binds an onChange event on the select to subscribe to the selected
// filter list.
LanguageSelectUtil.init = function () {
  var languageFilterListArr = filterListSections.language_filter_list.array;
  for (var i = 0; i < languageFilterListArr.length; i++) {
    var languageFilterList = languageFilterListArr[i];
    if (!languageFilterList.subscribed) {
      var option = new OptionForFilterList(languageFilterList, i);
      LanguageSelectUtil.insertOption(option.get(), i);
    }
  }

  $('#language_select').change(function () {
    var $this          = $(this);
    var selectedOption = $this.find(':selected');
    var index          = $(selectedOption).data('index');
    var entry          = languageFilterListArr[index];
    if (entry) {
      $this.find('option:first').prop('selected', true);
      selectedOption.remove();
      var $checkbox = $('[name=\'' + entry.id + '\']').find('input');
      $checkbox.prop('checked', true);
      $checkbox.trigger('change');
    }
  });
}

// Trigger change event to language select using one of the entries.
// Input:
//   filterList:object - Filter list to select.
LanguageSelectUtil.triggerChange = function (filterList) {
  var $languageSelect = $('#language_select');
  $languageSelect.val(filterList.id);
  $languageSelect.trigger('change');
}

// Utility class for Subscriptions.
function SubscriptionUtil() {
}

// Returns true if the user knows what they are doing, subscribing to many
// filter lists.
SubscriptionUtil.validateOverSubscription = function () {
  if ($('.subscription :checked').length <= 6) {
    return true;
  }

  if (optionalSettings &&
      optionalSettings.show_advanced_options) {
    // In case of an advanced user, only warn once every 30 minutes, even
    // if the options page wasn't open all the time. 30 minutes = 1/48 day
    if ($.cookie('noOversubscriptionWarning')) {
      return true;
    } else {
      $.cookie('noOversubscriptionWarning', 'true', { expires: (1 / 48) });
    }
  }

  return confirm(translate('you_know_thats_a_bad_idea_right'));
}

// Returns true if the user knows what they are doing, unsubscribing from
// all filter lists.
SubscriptionUtil.validateUnderSubscription = function () {
  if ($('.subscription :checked').length >= 1) {
    return true;
  }

  if (optionalSettings &&
      optionalSettings.show_advanced_options) {
    // In case of an advanced user, only warn once every 30 minutes, even
    // if the options page wasn't open all the time. 30 minutes = 1/48 day
    if ($.cookie('noUnderSubscriptionWarning')) {
      return true;
    } else {
      $.cookie('noUnderSubscriptionWarning', 'true', { expires: (1 / 48) });
    }
  }

  return confirm(translate('unsubscribe_from_all_confirmation'));
}

// Subscribe to the filter list with the given |id|.
// Input:
//   id:string - Id of the filter list to be subscribed to.
SubscriptionUtil.subscribe = function (id, title) {
  SubscriptionUtil._updateCacheValue(id);
  var subscription = FilterListUtil.cachedSubscriptions[id];
  if (subscription) {
    subscription = Subscription.fromURL(subscription.url);
  } else {
    // Working with an unknown list: create the list entry
    if (/^url\:.*/.test(id)) {
      var newSub = {
        user_submitted: true,
        initialUrl: id.substr(4),
        url: id.substr(4),
        title: title,
      };
      FilterListUtil.cachedSubscriptions[id] = newSub;
      subscription = Subscription.fromURL(newSub.url);
    }
  }

  filterStorage.addSubscription(subscription);
  if (subscription instanceof DownloadableSubscription) {
    Synchronizer.execute(subscription);
  }

  if (id === 'acceptable_ads') {
    $('#acceptable_ads_info').slideUp();
    $('#acceptable_ads').prop('checked', true);
  }

  if (id === 'easylist') {
    $('#easylist_info').slideUp();
  }
};

// Unsubscribe to the filter list with the given |id|.
// Input:
//   id:string - Id of the filter list to be subscribed to.
//   del:boolean - Flag to indicate if filter list should be deleted in the background.
SubscriptionUtil.unsubscribe = function (id) {
  SubscriptionUtil._updateCacheValue(id);
  var subscription = FilterListUtil.cachedSubscriptions[id];
  subscription     = Subscription.fromURL(subscription.url);

  setTimeout(function () {
    filterStorage.removeSubscription(subscription);
  }, 1);

  if (id === 'acceptable_ads') {
    $('#acceptable_ads_info').slideDown();
    $('#acceptable_ads').prop('checked', false);
  }

  if (id === 'easylist') {
    $('#easylist_info').slideDown();
  }
}

// Update the given filter list in the cached list.
// Input:
//   id:string - Id of the filter list to be updated.
SubscriptionUtil._updateCacheValue = function (id) {
  var sub = FilterListUtil.cachedSubscriptions[id];
  if (sub) {
    var properties = ['downloadStatus', 'label', 'lastDownload', '_downloadStatus'];
    for (var i = 0; i < properties.length; i++) {
      if (sub[properties[i]]) {
        delete sub[properties[i]];
      }
    }
  }
}

// Utility class for custom filter list upload box.
function CustomFilterListUploadUtil() {
}

// Perform the subscribing part and creating checkbox for custom filter lists.
// Inputs:
//   url:string - Url for the custom filter list.
//   subscribeTo:string - The id of the custom filter list.
CustomFilterListUploadUtil._performUpload = function (url, subscribeTo, title) {
  var entry = {
    id: subscribeTo,
    url: url,
    subscribed: false,
    user_submitted: true,
    label: '',
    title: title,
  };
  FilterListUtil.cachedSubscriptions[entry.id] = entry;
  var customFilterList  = filterListSections.custom_filter_list;
  customFilterList.array.push(entry);
  var checkbox = new CheckboxForFilterList(entry, 'custom_filter_list', customFilterList.array.length, customFilterList.$container);
  checkbox.createCheckbox(true);
  removeBottomLine('custom_filters');
}

// When a user enters a URL in the custom filter list textbox for a known filter list,
// this method clicks the correct filter list checkbox/select option for him instead.
// Input:
//   existingFilterList:object - Filter list whose URL was entered by the user.
CustomFilterListUploadUtil._updateExistingFilterList = function (existingFilterList) {
  var $containingDiv = $('div[name=\'' + existingFilterList.id + '\']');
  if ($containingDiv.length < 1) {
    // If the checkbox does not exist but there is an existing filter list,
    // then recreate the checkbox
    var filterListType    = FilterListUtil.getFilterListType(existingFilterList);
    var filterListArray   = filterListSections[filterListType].array;
    var index             = filterListArray.indexOf(existingFilterList);
    if (index < 0) {
      index = filterListArray.length;
      filterListArray.push(existingFilterList);
    }

    var checkboxForFilterList = new CheckboxForFilterList(existingFilterList, filterListType, index, filterListSections[filterListType].$container);
    checkboxForFilterList.createCheckbox();
    $containingDiv = $('div[name=\'' + existingFilterList.id + '\']');
  }

  var checkbox = $($containingDiv).find('input');
  if (!checkbox.is(':checked')) {
    if (checkbox.attr('id').indexOf('language_filter_list') >= 0) {
      LanguageSelectUtil.triggerChange(existingFilterList);
    } else {
      checkbox.prop('checked', true);
      checkbox.trigger('change');
    }
  }
  removeBottomLine('custom_filters');
}

// Binds events for key press 'enter' and click for upload box.
CustomFilterListUploadUtil.bindControls = function () {
  $('#btnNewSubscriptionUrl').click(function () {
    var url       = $('#txtNewSubscriptionUrl').val();
    var abpRegex = /^abp.*\Wlocation=([^\&]+)/i;
    if (abpRegex.test(url)) {
      url = url.match(abpRegex)[1]; // The part after 'location='.
      url = unescape(url);
    }

    url = url.trim();
    var subscribeTo = 'url:' + url;

    var existingFilterList = FilterListUtil.checkUrlForExistingFilterList(url);

    if (existingFilterList) {
      CustomFilterListUploadUtil._updateExistingFilterList(existingFilterList);
    } else {
      if (/^https?\:\/\/[^\<]+$/.test(url)) {
        CustomFilterListUploadUtil._performUpload(url, subscribeTo);
      } else {
        alert(translate('failedtofetchfilter'));
      }
    }
    $('#txtNewSubscriptionUrl').val('');
  });

  // Pressing enter will add the list too.
  $('#txtNewSubscriptionUrl').keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $('#btnNewSubscriptionUrl').click();
    }
  });
}

function onFilterChangeHandler(action, item) {
  var updateEntry = function (entry, eventAction) {
    if (entry) {
      // copy / update relevant properties to the cached entry
      var properties = ['downloadStatus', 'label', 'lastDownload', '_downloadStatus', 'language'];
      for (var i = 0; i < properties.length; i++) {
        if (entry[properties[i]]) {
          FilterListUtil.cachedSubscriptions[entry.id][properties[i]] = entry[properties[i]];
        }
      }

      if (eventAction &&
          eventAction === "subscription.added") {
        FilterListUtil.cachedSubscriptions[entry.id].subscribed = true;
      }
      if (eventAction &&
          eventAction === "subscription.removed") {
        FilterListUtil.cachedSubscriptions[entry.id].subscribed = false;
      }

      // Update checkbox according to the value of the subscribed field
      FilterListUtil.updateCheckbox(FilterListUtil.cachedSubscriptions[entry.id], entry.id);

      // If sub is subscribed, update lastUpdate_failed_at or lastUpdate field
      if (FilterListUtil.cachedSubscriptions[entry.id].subscribed)
      {
        FilterListUtil.updateSubscriptionInfoForId(entry.id);
      }
    }
  };

  // If we get an entry, update it
  if (item && item.url) {
    var updateItem = function (item, id) {
      item.id = id;
      updateEntry(item, action);
    };

    var id = backgroundPage.getIdFromURL(item.url);
    if (id) {
      updateItem(item, id);
      return;
    } else if (FilterListUtil.cachedSubscriptions['url:' + item.url]) {
      // or user subscribed filter list
      updateItem(item, 'url:' + item.url);
      return;
    } else if (action === 'subscription.title' && param1) {
      // or if the URL changed due to a redirect, we may not be able to determine
      // the correct id, but should be able to using one of the params
      var id = backgroundPage.getIdFromURL(param1);
      if (id) {
        updateItem(item, id);
        return;
      } else {
        var id = backgroundPage.getIdFromURL(param2);
        if (id) {
          updateItem(item, id);
          return;
        }
      }
    }
  }
  // If we didn't get an entry or id, loop through all of the subscriptions.
  var subs = backgroundPage.getAllSubscriptionsMinusText();
  var cachedSubscriptions = FilterListUtil.cachedSubscriptions;
  for (var id in cachedSubscriptions) {
    var entry = subs[id];
    updateEntry(entry);
  }
}

function translateIDs(id) {
  var idsWith2 = ['warning_removal', 'annoyances', 'antisocial'];
  if (idsWith2.includes(id)) {
    var translatedMsg = translate('filter_' + id + '2');
    translatedMsg = translatedMsg.trim();
    if (translatedMsg != "" && translatedMsg.length > 0) {
       return translatedMsg;
    } else {
       return translate('filter' + id + '2');
    }
  }

  if (id.endsWith('_old')) {
    var trimmedID = id.split(/_old$/)[0];
    return translate('filter' + trimmedID);
  } else {
    var translatedMsg = translate('filter_' + id);
    translatedMsg = translatedMsg.trim();
    if (translatedMsg != "" && translatedMsg.length > 0) {
       return translatedMsg;
    } else {
       return translate('filter' + id);
    }
  }
}

$(function () {
  // Retrieves list of filter lists from the background.
  var subs = backgroundPage.getAllSubscriptionsMinusText();

  // Initialize page using subscriptions from the background.
  // Copy from update subscription list + setsubscriptionlist
  FilterListUtil.prepareSubscriptions(subs);

  for (var id in filterListSections) {
    var sectionHandler = new SectionHandler(filterListSections[id], id);
    sectionHandler.initSection();
  }

  LanguageSelectUtil.init();
  CustomFilterListUploadUtil.bindControls();

  var onSave = function(item) {
    onFilterChangeHandler("save", item);
  };
  filterNotifier.on("save", onSave);

  var onSubAdded = function(item) {
    onFilterChangeHandler("subscription.added", item);
  };
  filterNotifier.on("subscription.added", onSubAdded);

  var onSubRemoved = function(item) {
    onFilterChangeHandler("subscription.removed", item);
  };
  filterNotifier.on("subscription.removed", onSubRemoved);

  var onSubUpdated = function(item) {
    onFilterChangeHandler("subscription.updated", item);
  };
  filterNotifier.on("subscription.updated", onSubUpdated);

  var onStatusChanged = function(item) {
    onFilterChangeHandler("subscription.downloadStatus", item);
  };
  filterNotifier.on("subscription.downloadStatus", onStatusChanged);

  var onError = function(item) {
    onFilterChangeHandler("subscription.errors", item);
  };
  filterNotifier.on("subscription.errors", onError);

  window.addEventListener("unload", function() {
    filterNotifier.off("save", onSave);
    filterNotifier.off("subscription.added", onSubAdded);
    filterNotifier.off("subscription.removed", onSubRemoved);
    filterNotifier.off("subscription.updated", onSubUpdated);
    filterNotifier.off("subscription.downloadStatus", onStatusChanged);
    filterNotifier.off("subscription.errors", onError);
  });

  FilterListUtil.updateSubscriptionInfoAll();

  window.setInterval(function () {
    FilterListUtil.updateSubscriptionInfoAll();
  }, 10000);

  $('#btnUpdateNow').click(function () {
    $(this).prop('disabled', true);
    backgroundPage.updateFilterLists();
    setTimeout(function () {
      $('#btnUpdateNow').prop('disabled', false);
    }, 300000); // Re-enable update button after 5 minutes.
  });

  $('#btnShowLinks').click(function () {
    $('.filter-list-link').fadeIn('slow');
    $('#btnShowLinks').remove();
  });

  if (delayedSubscriptionSelection) {
    startSubscriptionSelection.apply(null, delayedSubscriptionSelection);
  }
});

$(document).ready(function() {
  $txtInputCustomURL = $('#txtNewSubscriptionUrl');
  $txtInputCustomURL.attr('placeholder', translate('enter_url'));
  removeBottomLine('all');
});
