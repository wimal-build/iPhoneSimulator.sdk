/*
 * Copyright (c) 2014 Apple Inc. All rights reserved.
 */

function stringContainsCaseInsensitiveString(haystackString, needleString)
{
    if (!haystackString || !needleString)
        return false;

    return (haystackString.toLowerCase().indexOf(needleString.toLowerCase()) !== -1);
}

function stringContainsCaseInsensitiveWordOrPhrase(haystackString, needleWord)
{
    if (!haystackString || !needleWord)
        return false;

    const wordDelimiterRegExp = /[^0-9A-Za-z]+/;

    haystackString = haystackString.toLowerCase();
    needleWord = needleWord.toLowerCase();

    var startIndex = 0;
    while (true) {
        var indexOfWord = haystackString.indexOf(needleWord, startIndex);
        if (indexOfWord === -1)
            break;

        startIndex += indexOfWord + needleWord.length;
        var leadingCharacter = haystackString[indexOfWord - 1];
        if (leadingCharacter === undefined || wordDelimiterRegExp.test(leadingCharacter)) {
            var trailingCharacter = haystackString[startIndex];
            if (trailingCharacter === undefined || wordDelimiterRegExp.test(trailingCharacter))
                return true;
        }
    }
    return false;
}

function linkIsHTTPFamilyURL(element)
{
    var protocol = element.protocol;
    return (protocol === "http:" || protocol === "https:");
}

function decodeURIString(uriString)
{
    try {
        // Replace "+" with " " then decode precent encoded values.
        return decodeURIComponent(uriString.replace(/\+/g, " "));
    } catch (e) {
        return uriString;
    }
}

function parametersFromSearch(search)
{
    var map = {};
    var parameters = search.substring(1).split("&");
    var numberOfParameters = parameters.length;
    for (var i = 0; i < numberOfParameters; ++i) {
        var parameter = decodeURIString(parameters[i]);
        var equalsIndex = parameter.indexOf("=");
        if (equalsIndex === -1)
            map[parameter] = null;
        else
            map[parameter.substring(0, equalsIndex)] = parameter.substring(equalsIndex + 1);
    }
    return map;
}

var DesktopSiteDataFinder = function() {};

DesktopSiteDataFinder.prototype = {
    desktopSiteData: function()
    {
        return {
            "desktopLinkURLString": this._desktopLinkURLString(),
            "canonicalURLString": this._canonicalURLString(),
        };
    },

    _desktopLinkURLString: function()
    {
        var link = this._findDesktopLink();
        return link ? link.href : "";
    },

    _canonicalURLString: function()
    {
        if (!document.head)
            return "";

        var linkRelCanonicalElement = document.head.querySelector("link[rel='canonical']");
        return linkRelCanonicalElement ? linkRelCanonicalElement.href : "";
    },

    _findDesktopLink: function()
    {
        if (!document.body)
            return null;

        const CandidateScoreThresholdNotNeedingComparisonToContender = 8;
        const CandidateScoreMinimumThreshold = 5;
        const MinimumDifferenceBetweenTopCandidateScores = 2;

        var anchors = document.body.getElementsByTagName("a");
        var bestAnchor = null;
        var bestScore = 0;
        var secondBestAnchor = null;
        var secondBestScore = 0;

        var numberOfAnchors = anchors.length;
        for (var i = 0; i < numberOfAnchors; ++i) {
            var anchor = anchors[i];
            if (bestAnchor && anchor.href === bestAnchor.href)
                continue;
            if (secondBestAnchor && anchor.href === secondBestAnchor.href)
                continue;

            var score = this._scoreForDesktopSiteLinkCandidate(anchor);
            if (score >= bestScore) {
                secondBestScore = bestScore;
                secondBestAnchor = bestAnchor;

                bestScore = score;
                bestAnchor = anchor;
            } else if (score >= secondBestScore) {
                secondBestScore = score;
                secondBestAnchor = anchor;
            }
        }

        if (bestScore >= CandidateScoreThresholdNotNeedingComparisonToContender)
            return bestAnchor;
        if (bestScore >= CandidateScoreMinimumThreshold && bestScore - secondBestScore >= MinimumDifferenceBetweenTopCandidateScores)
            return bestAnchor;

        return null;
    },

    _scoreForDesktopSiteLinkCandidate: function(element)
    {
        if (!linkIsHTTPFamilyURL(element))
            return 0;

        var score = 0;
        score += this._scoreForDesktopSiteLinkCandidateText(element.text);
        score += this._scoreForDesktopSiteLinkCandidateForAttributes(element);
        score += this._scoreForDesktopSiteLinkCandidateForPositionOnPage(element);
        return score;
    },

    _scoreForDesktopSiteLinkCandidateText: function(linkText)
    {
        const LongLinkTextPenalty = 2;
        const LongLinkTextPenaltyThreshold = 25;
        const LinkTextMultipleKeywordsMatchedBonus = 2;

        var score = 0;
        var numberOfMatchedKeywords = 0;
        var textKeywordAndValuePairs = [{text:"desktop", value:2}
                                       ,{text:"classic", value:2}
                                       ,{text:"full", value:1}
                                       ,{text:"visit", value:1}
                                       ,{text:"view", value:1}
                                       ,{text:"version", value:1}
                                       ,{text:"accéder", value:1}
                                       ,{text:"afficher", value:1}
                                       ,{text:"PC", value:1}
                                       ,{text:"complet", value:1}
                                       ,{text:"classique", value:1}
                                       ];

        if (!stringContainsCaseInsensitiveWordOrPhrase(linkText, "web site") && !stringContainsCaseInsensitiveWordOrPhrase(linkText, "desktop"))
            textKeywordAndValuePairs.push({text:"web", value:1});

        if (!stringContainsCaseInsensitiveWordOrPhrase(linkText, "site map"))
            textKeywordAndValuePairs.push({text:"site", value:2});

        var numberOftextKeywordAndValuePairs = textKeywordAndValuePairs.length;
        for (var i = 0; i < numberOftextKeywordAndValuePairs; ++i) {
            var keywordAndValuePair = textKeywordAndValuePairs[i];
            if (stringContainsCaseInsensitiveWordOrPhrase(linkText, keywordAndValuePair.text)) {
                score += keywordAndValuePair.value;
                ++numberOfMatchedKeywords;
            }
        }

        if (linkText.length > LongLinkTextPenaltyThreshold)
            score -= LongLinkTextPenalty;

        // Matching more than one of the positive keywords is a positive indicator itself.
        if (numberOfMatchedKeywords > 1)
            score += LinkTextMultipleKeywordsMatchedBonus;

        return score;
    },

    _scoreForDesktopSiteLinkCandidateForAttributes: function(anchor)
    {
        const AttributeMatchBonus = 1;
        const CandidateLinkIsInternalToCurrentSiteBonus = 1;

        const anchorAttributesToInspect = ["id", "rel", "class"];
        const attributeKeywords = ["full", "site", "home", "mobile"];

        var score = 0;

        var numberOfAnchorAttributesToInspect = anchorAttributesToInspect.length;
        var numberOfAttributeKeywords = attributeKeywords.length;
        for (var attributeIndex = 0; attributeIndex < numberOfAnchorAttributesToInspect; ++attributeIndex) {
            var attributeValue = anchor.getAttribute(anchorAttributesToInspect[attributeIndex]);
            if (!attributeValue)
                continue;

            for (var keywordIndex = 0; keywordIndex < numberOfAttributeKeywords; ++keywordIndex) {
                if (stringContainsCaseInsensitiveString(attributeValue, attributeKeywords[keywordIndex]))
                    score += AttributeMatchBonus;
            }
        }

        if (anchor.host === location.host)
            score += CandidateLinkIsInternalToCurrentSiteBonus;

        var queryParametersMap = parametersFromSearch(anchor.search);
        for (var key in queryParametersMap)
            score += this._scoreForQueryParameter(key, queryParametersMap[key]);

        return score;
    },

    _scoreForQueryParameter: function(queryKey, queryValue)
    {
        const MatchingQueryParameterKeyAndValueBonus = 4;
        const MatchingQueryParameterKeyBonus = 1;

        const commonDesktopSiteKeywordsInSearchParameterKey = ["mobile", "full", "m", "mobi", "mobileaction"];
        const commonDesktopSiteKeywordsInSearchParameterValue = ["yes", "true", "false", "off", "1", "0", "toggle", "desktop"];

        const keywordsSignifyingMobileInSearchParameterKey = ["mobile", "m"];
        const keywordsSignifyingTruthInSearchParameterValue = ["yes", "true", "1"];

        var keyMatchesDesktopLinkKeyword = false;
        var keyMatchesMobileKeyword = false;
        var valueMatchesDesktopLinkKeyword = false;

        var numberOfCommonDesktopSiteKeywordsInSearchParameterKey = commonDesktopSiteKeywordsInSearchParameterKey.length;
        for (var i = 0; i < numberOfCommonDesktopSiteKeywordsInSearchParameterKey; ++i) {
            var desktopKeyword = commonDesktopSiteKeywordsInSearchParameterKey[i];
            if (stringContainsCaseInsensitiveWordOrPhrase(queryKey, desktopKeyword)) {
                if (keywordsSignifyingMobileInSearchParameterKey.indexOf(desktopKeyword) !== -1)
                    keyMatchesMobileKeyword = true;

                keyMatchesDesktopLinkKeyword = true;
                break;
            }
        }

        if (keyMatchesDesktopLinkKeyword) {
            var numberOfCommonDesktopSiteKeywordsInSearchParameterValue = commonDesktopSiteKeywordsInSearchParameterValue.length;
            for (var i = 0; i < numberOfCommonDesktopSiteKeywordsInSearchParameterValue; ++i) {
                var desktopKeyword = commonDesktopSiteKeywordsInSearchParameterValue[i];
                if (stringContainsCaseInsensitiveWordOrPhrase(queryValue, desktopKeyword)) {
                    if (keyMatchesMobileKeyword && keywordsSignifyingTruthInSearchParameterValue.indexOf(desktopKeyword) !== -1)
                        keyMatchesDesktopLinkKeyword = false;
                    else
                        valueMatchesDesktopLinkKeyword = true;

                    break;
                }
            }
        }

        if (keyMatchesDesktopLinkKeyword && valueMatchesDesktopLinkKeyword)
            return MatchingQueryParameterKeyAndValueBonus;
        if (keyMatchesDesktopLinkKeyword)
            return MatchingQueryParameterKeyBonus;

        return 0;
    },

    _scoreForDesktopSiteLinkCandidateForPositionOnPage: function(element)
    {
        const LocationInFooterBonus = 1;

        // Desktop site links are often located within the footer of a site.
        for (var ancestorElement = element.parentElement; ancestorElement; ancestorElement = ancestorElement.parentElement) {
            ancestorElementTagName = ancestorElement.tagName;
            if (ancestorElementTagName === "DIV") {
                var ancestorElementID = ancestorElement.getAttribute("id");
                if (ancestorElementID && stringContainsCaseInsensitiveString(ancestorElementID, "footer"))
                    return LocationInFooterBonus;

                var ancestorElementClass = ancestorElement.getAttribute("class");
                if (ancestorElementClass && stringContainsCaseInsensitiveString(ancestorElementClass, "footer"))
                    return LocationInFooterBonus;
            } else if (ancestorElementTagName === "FOOTER")
                return LocationInFooterBonus;
        }
        return 0;
    },
};

var DesktopSiteDataFinderJS = new DesktopSiteDataFinder;
